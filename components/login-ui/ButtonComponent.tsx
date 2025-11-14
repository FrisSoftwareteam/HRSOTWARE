"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Lock } from "lucide-react";
import { auth, micrsoftAuthProvider } from "@/firebase/config";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { useGetUserProfile } from "@/zustand/store";

export default function ButtonComponent() {
  const [loadings, setLoadings] = useState([]);
  const { profile, getUserData } = useGetUserProfile();

  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleLogin = async () => {
    setButtonState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Randomly succeed or fail for demo
    const success = Math.random() > 0.3;
    setButtonState(success ? "success" : "error");

    // Reset after showing result
    setTimeout(() => {
      setButtonState("idle");
    }, 2000);
  };

  const { push } = useRouter();
  const microsoftLogin = async (index: any) => {
    setLoadings((prevLoadings) => {
      setButtonState("loading");
      const newLoadings: any = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    auth
      .signInWithPopup(micrsoftAuthProvider)
      .then(async (userProfile: any) => {
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings: any = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
          });
        }, 300000);

        const { user } = userProfile;

        const { credential } = userProfile;

        const idTokenResult = await user.getIdTokenResult();
        console.log(credential.accessToken);

        axios
          .post(
            "https://hrms-app-login.azurewebsites.net/v1/loginuser",
            {},
            {
              headers: {
                authtoken: idTokenResult.token,
                accesstoken: credential.accessToken,
              },
            }
          )
          .then(async (user: any) => {
            if (user) {
              console.log(user);
              setButtonState("success");

              getUserData(user.data);

              if (user.data.role === "user") {
                push("/users");
              } else if (user.data.role === "admin") {
                push("/admin");
              } else if (user.data.role === "manager") {
                push("/manager");
              } else if (user.data.role === "manager2") {
                push("/manager2");
              } else if (user.data.role === "manager3") {
                push("/manager3");
              } else if (user.data.role === "manager4") {
                push("/manager4");
              }
            }
          })

          .catch((error) => {
            setTimeout(() => {
              setLoadings((prevLoadings) => {
                setButtonState("error");
                const newLoadings: any = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
              });
            }, 2000);
          });
      });
  };

  const getButtonConfig = () => {
    switch (buttonState) {
      case "loading":
        return {
          text: "Signing in...",
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          bgColor: "bg-blue-500",
          disabled: true,
        };
      case "success":
        return {
          text: "Welcome!",
          icon: <Check className="w-4 h-4" />,
          bgColor: "bg-green-500",
          disabled: true,
        };
      case "error":
        return {
          text: "Try again",
          icon: <Lock className="w-4 h-4" />,
          bgColor: "bg-red-500",
          disabled: false,
        };
      default:
        return {
          text: "Sign in",
          icon: <Lock className="w-4 h-4" />,
          bgColor: "bg-blue-600 hover:bg-blue-700",
          disabled: false,
        };
    }
  };

  const config = getButtonConfig();

  return (
    <div>
      <div className="space-y-4">
        <motion.button
          onClick={microsoftLogin}
          disabled={config.disabled}
          className={`
              relative w-full flex items-center justify-center px-4 py-3 
              text-white font-medium rounded-lg shadow-md
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:cursor-not-allowed transition-colors duration-200
              ${config.bgColor}
            `}
          whileHover={!config.disabled ? { scale: 1.02 } : {}}
          whileTap={!config.disabled ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <motion.div
            className="flex items-center space-x-2"
            layout
            transition={{ duration: 0.2 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={buttonState}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}>
                {config.icon}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.span
                key={buttonState}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}>
                {config.text}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Ripple effect */}
          {buttonState === "idle" && (
            <motion.div
              className="absolute inset-0 rounded-lg"
              initial={{ scale: 0, opacity: 0.5 }}
              whileTap={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              }}
            />
          )}
        </motion.button>

        {/* Progress indicator */}
        <AnimatePresence>
          {buttonState === "loading" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
