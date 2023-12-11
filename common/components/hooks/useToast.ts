import { useState } from "react";

const useToast = () => {
  const [isToastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return {
    isToastVisible,
    toastMessage,
    showToast,
    hideToast,
  };
};

export default useToast;
