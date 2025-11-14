"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface OvalUserProfileProps {
  avatarUrl?: string;
  username: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function OvalUserProfile({
  avatarUrl,
  username,
  size = "md",
  className,
  onClick,
}: OvalUserProfileProps) {
  const truncatedName =
    username.length > 10 ? `${username.slice(0, 8)}...` : username;

  const getInitials = (name: string) => {
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      // Use first letter of first name and first letter of last name
      return `${nameParts[0][0]}${
        nameParts[nameParts.length - 1][0]
      }`.toUpperCase();
    } else {
      // Use only first letter if there's only one name
      return name[0]?.toUpperCase() || "";
    }
  };

  const initials = getInitials(username);

  const sizeClasses = {
    sm: "px-3 py-2 gap-2",
    md: "px-4 py-3 gap-3",
    lg: "px-6 py-4 gap-4",
  };

  const avatarSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full",
        "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700",
        "shadow-md hover:shadow-lg transition-all duration-300",
        "hover:scale-105 cursor-pointer",
        "border border-slate-200/50 dark:border-slate-600/50",
        sizeClasses[size],
        className
      )}
      onClick={onClick}>
      <Avatar
        className={cn(
          avatarSizes[size],
          "ring-1 ring-slate-300/30 dark:ring-slate-500/30"
        )}>
        <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={username} />
        <AvatarFallback className="bg-slate-600 text-white dark:bg-slate-300 dark:text-slate-800 font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <span
        className={cn(
          "font-medium text-slate-700 dark:text-slate-200",
          textSizes[size]
        )}
        title={username}>
        {truncatedName}
      </span>
    </div>
  );
}
