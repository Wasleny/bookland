import { useEffect, useState } from "react";

const useHasVerticalScroll = () => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      setHasScroll(isScrollable);
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(document.documentElement);

    const mutationObserver = new MutationObserver(checkScroll);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", checkScroll);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return hasScroll;
};

export default useHasVerticalScroll;
