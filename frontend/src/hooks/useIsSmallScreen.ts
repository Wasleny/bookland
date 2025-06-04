import { useEffect, useState } from "react";

interface UseIsSmallScreenProps {
  width: "480px" | "768px" | "1024px" | "1280px";
}

const useIsSmallScreen = ({ width }: UseIsSmallScreenProps) => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`screen and (max-width: ${width})`);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSmall(e.matches);
    };

    setIsSmall(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [width]);

  return isSmall;
};

export default useIsSmallScreen;
