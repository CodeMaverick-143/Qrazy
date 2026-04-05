import { useContext } from "react";
import { ToastContext } from "../context/ToastContextType";

export const useChaos = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useChaos must be used within a ToastProvider");
  }
  return context;
};
