import { createSignal, For } from "solid-js";
import { styled } from "styled-system/jsx";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

const [toasts, setToasts] = createSignal<Toast[]>([]);
let idCounter = 0;

export function showToast(message: string, type: "success" | "error") {
  const id = ++idCounter;
  setToasts((prev) => [...prev, { id, message, type }]);

  // auto remove after 3s
  setTimeout(() => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, 3000);
}

const ToastWrapper = styled("div", {
  base: {
    position: "fixed",
    top: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    zIndex: 9999,
  },
});

const ToastItem = styled("div", {
  base: {
    px: "4",
    py: "2",
    rounded: "md",
    color: "white",
    fontWeight: "500",
  },
  variants: {
    type: {
      success: { bg: "success" },
      error: { bg: "error" },
    },
  },
});

export function Toaster() {
  return (
    <ToastWrapper>
      <For each={toasts()}>
        {(t) => <ToastItem type={t.type}>{t.message}</ToastItem>}
      </For>
    </ToastWrapper>
  );
}
