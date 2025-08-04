import { useState, useEffect } from "react";

export const useDetectOutsideClick = (domNode: any, initialState: any) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      // If the active element exists and is clicked outside of
      if (!domNode.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      document.addEventListener("click", pageClickEvent);
    }

    return () => {
      document.removeEventListener("click", pageClickEvent);
    };
  }, [isActive, domNode]);

  return [isActive, setIsActive];
};
