import { create } from "zustand";

type Role = "admin" | "user" | null;
type Page = "users" | "login" | "profile" | "admin" | "forbidden";
type User = {
  email: string;
  name?: string;
  photo?: string;
  role?: string;
  department?: string;
};

interface DialogOnboardingProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: any;
  toggle: () => void;
  setData: (data: any) => void;
}

interface GetAllStates {
  states: any;
  isloading: boolean;
  error: any;
  fetchData: () => void;
}

interface GetAllLga {
  lgaData: any;
  isloadingLga: boolean;
  error: any;
  fetchDataLga: (id: any) => void;
}

interface GetFormId {
  formId: number;
  //isloadingFormState: boolean;
  error: any;
  getFormId: (id: number) => void;
}

interface FormState {
  formstate: boolean;
  isloadingFormState: boolean;
  error: any;
  updateFormState: () => void;
}

interface FlowState {
  flowstate: string;
  isloadingFlowState: boolean;
  error: any;
  createFlowState: () => void;
}

interface SwitchMode {
  isSwitch: boolean;
  switchState: (e: boolean) => void;
}

interface GetIdProps {
  loadings: boolean;
  qustionId: any;
  getAnsId: (id: any, user: any) => void;
  data: any;
  user: {};
}

interface ModelGetUserProfile {
  profile: User;
  isloading: boolean;
  error: any;
  page: Page;
  role: Role;
  getUserData: (data: any) => void;
}

interface ModelGetAnswer {
  answer: any;
  isloading: boolean;
  error: any;
  getAnswers: (data: any) => void;
}

interface ModelGetALLAnswer {
  answer: any;
  isloading: boolean;
  error: any;
  getAnswer: () => void;
}

interface ModelGetAnswers {
  answers: [];
  addOrUpdateAnswer: (newAnswer: any) => void;
  clearAnswers: () => void;
}

export const useGetAnswerId = create<GetIdProps>((set) => ({
  data: {},
  qustionId: 0,
  loadings: true,
  user: {},

  getAnsId: async (data, user) => {
    set({ data: data, qustionId: data });
    try {
      const getUserInfo: any = await fetch(`/api/get-users-detail/${user}`, {
        cache: "no-store",
      });

      // console.log(data);
      let { data: data2 } = await getUserInfo.json();

      console.log(data2, user);

      set({ loadings: false });

      set({ user: data2 });
    } catch (error) {}

    // }
  },
}));

export const useGetUserProfile = create<ModelGetUserProfile>((set) => ({
  profile: {
    email: "",
  },
  error: null,
  page: "login",
  role: null,
  isloading: false,
  getUserData: async (data: any) => {
    set({ isloading: true });
    try {
      set({
        profile: data,
        page: data.role === "admin" ? "admin" : "users",
        role: data.role,
      });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloading: false });
    }
  },
}));

export const useGetAnswers = create<ModelGetALLAnswer>((set) => ({
  answer: [],
  error: null,
  isloading: false,
  getAnswer: async () => {
    set({ isloading: true });

    try {
      const getAllAns: any = await fetch("/api/get-all-answered", {
        cache: "no-store",
      });

      let { data } = await getAllAns.json();

      //console.log("Scanned", data);

      set({ answer: data });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloading: false });
    }
  },
}));

export const useGetAnswer = create<ModelGetAnswer>((set) => ({
  answer: {},
  error: null,
  isloading: false,
  getAnswers: async (data: any) => {
    set({ isloading: true });

    try {
      set((state: any) => ({
        answer: { ...state.answer, ...data }, // Append new data to existing state
      }));
      console.log("Answer updated with new collections:", { ...data });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloading: false });
    }
  },
}));

export const useDialogOnboarding = create<DialogOnboardingProps>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: false }),

  data: {},
  setData: (data) => set({ data: { data } }),
}));

export const useFetchState = create<GetAllStates>((set) => ({
  states: [],
  error: null,
  isloading: false,
  fetchData: async () => {
    set({ isloading: true });

    try {
      const getAllStates: any = await fetch("/api/getstates", {
        cache: "no-store",
      });

      let { data } = await getAllStates.json();

      // console.log("Scanned", data);

      set({ states: data });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloading: false });
    }
  },
}));

export const useSwitchMode = create<SwitchMode>((set) => ({
  isSwitch: false,
  switchState: async (e) => set({ isSwitch: e }),
}));

export const useFetchLga = create<GetAllLga>((set) => ({
  lgaData: [],
  error: null,
  isloadingLga: false,
  fetchDataLga: async (id: any) => {
    set({ isloadingLga: true });

    // console.log(id);

    try {
      const getAllLga: any = await fetch(`/api/getlga/${id}`, {
        cache: "no-store",
      });

      let { data } = await getAllLga.json();

      console.log("Scanned", data);

      set({ lgaData: data });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloadingLga: false });
    }
  },
}));

export const useFormState = create<FormState>((set) => ({
  formstate: false,
  error: null,
  isloadingFormState: false,
  updateFormState: async () => {
    set({ isloadingFormState: true });

    // console.log(id);

    try {
      // const getAllLga: any = await fetch(`/api/getlga/${id}`, {
      //   cache: "no-store",
      // });

      // let { data } = await getAllLga.json();

      // console.log("Scanned", data);

      set({ formstate: true });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      set({ isloadingFormState: false });
    }
  },
}));

export const useFormId = create<GetFormId>((set) => ({
  formId: 0,
  error: null,
  //isloadingFormState: false,
  getFormId: async (id: number) => {
    //set({ isloadingFormState: true });

    try {
      set({ formId: id });
    } catch (error) {
      console.log(error);
      set({ error: error });
    } finally {
      // set({ isloadingFormState: false });
    }
  },
}));

// export const useFlow = create<GetFormId>((set) => ({
//   flowstate: "",
//   error: null,
//   //isloadingFormState: false,
//   createFlowState: async (id: number) => {
//     //set({ isloadingFormState: true });

//     try {
//       set({ flowstate: id });
//     } catch (error) {
//       console.log(error);
//       set({ error: error });
//     } finally {
//       // set({ isloadingFormState: false });
//     }
//   },
// }));
