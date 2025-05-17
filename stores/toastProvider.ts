import { inject, provide, ref } from "vue";

const useToast = () => {
  const toasts = ref<Toast[]>([]);

  const showToast = (success: boolean, message?: string) => {
    const MSG = message ? message : success ? "Successful" : "Something went wrong";

    toasts.value.push({
      title: success ? "success" : "error",
      id: Date.now() + "",
      desc: MSG,
    });
  };

  return { toasts, showToast };
};

type ContextType = ReturnType<typeof useToast>;

export default function toastProvider() {
  const state = useToast();

  provide("toast_context", state);

  return state;
}

export function useToastContext() {
  const state = inject<ContextType>("toast_context")!;
  if (!state) throw new Error("CategoryProvider not provided");

  return state;
}
