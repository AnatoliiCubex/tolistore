import { useEffect } from "react";

export const useDisableBodyScroll = (open: boolean) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }, [open]);
};
