import styled from "@emotion/styled";

interface StyledCarouselProps {
  currentIndex: number;
  total: number;
  visibleItems: number;
  isTransitioning: boolean;
}

export const StyledCarousel = styled.div<StyledCarouselProps>`
  width: ${({ theme }) => theme.sizes.auto};
  max-width: ${({ theme }) => theme.sizes.full};
  overflow: hidden;
  position: relative;
  margin: ${({ theme }) => theme.spacing.xl};

  .carousel-track {
    display: flex;
    width: ${({ theme }) => theme.sizes.full};
    transform: translateX(
      -${({ visibleItems, currentIndex }) => (currentIndex * 100) / visibleItems}%
    );
    gap: ${({ theme }) => theme.spacing.xl};
    transition: ${({ isTransitioning }) =>
      isTransitioning ? "transform 0.5s ease-in-out" : "none"};
  }

  .carousel-item {
    width: calc(100% / ${({ visibleItems }) => visibleItems} - ${({ theme }) => theme.spacing.xl});
    flex: 0 0 auto;
  }
`;
