import { useEffect, useRef, useState, type ReactNode } from "react";
import { StyledCarousel } from "./styles";

interface CarouselProps {
  items: ReactNode[];
}

const Carousel = ({ items }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const total = items.length;
  const trackRef = useRef<HTMLDivElement>(null);

  const prependItems = items.slice(-visibleItems);
  const appendItems = items.slice(0, visibleItems);
  const infiniteItems = [...prependItems, ...items, ...appendItems];

  const handleTransitionEnd = () => {
    setIsTransitioning(true);

    if (currentIndex === total + visibleItems) {
      setIsTransitioning(false);
      setCurrentIndex(visibleItems);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(total);
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 480) setVisibleItems(1);
    else if (width <= 768) setVisibleItems(2);
    else if (width <= 1024) setVisibleItems(3);
    else if (width <= 1280) setVisibleItems(4);
    else setVisibleItems(5);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      void trackRef.current?.offsetHeight;
      setIsTransitioning(true);
    }
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledCarousel
      isTransitioning={isTransitioning}
      visibleItems={visibleItems}
      total={total}
      currentIndex={currentIndex}
    >
      <div
        ref={trackRef}
        className="carousel-track"
        onTransitionEnd={handleTransitionEnd}
      >
        {infiniteItems.map((item, index) => (
          <div className="carousel-item" key={index}>
            {item}
          </div>
        ))}
      </div>
    </StyledCarousel>
  );
};

export default Carousel;
