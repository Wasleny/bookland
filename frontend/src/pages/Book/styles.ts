import styled from "@emotion/styled";

export const NotFoundSection = styled.section`
  width: ${({ theme }) => theme.sizes.auto};
  margin: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const BookSection = styled.section`
  margin: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xxxl};
  }
`;

export const BookActions = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  > div:first-of-type {
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.xl};
  }

  button {
    width: ${({ theme }) => theme.sizes.full};
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};

    p {
      text-align: center;
      cursor: pointer;
    }
  }
`;

export const InformationSection = styled.section`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.sizes.full};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const Edition = styled.section`
  margin-top: ${({ theme }) => theme.spacing.lg};
  opacity: 75%;

  dl div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ReviewsSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.lg};

  h2 {
    margin: ${({ theme }) => theme.spacing.none};
  }
`;

export const Review = styled.article`
  > div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    width: ${({ theme }) => theme.sizes.full};

    header {
      min-width: ${({ theme }) => theme.sizes.elementXl};
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;
    }
  }
`;

export const ReviewBody = styled.div`
  border-left: ${({ theme }) =>
    `${theme.borders.thin} ${theme.colors.backgroundInverted}`};
  display: flex;
  flex-direction: column;
  text-align: justify;
  padding: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.md}`};
  justify-content: start;
  align-items: start;
  width: ${({ theme }) => theme.sizes.full};

  > div {
    display: flex;
    justify-content: space-between;
    width: ${({ theme }) => theme.sizes.full};
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    p {
      white-space: nowrap;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border-left: ${({ theme }) => theme.borders.none};

    > div {
      flex-direction: column-reverse;

      p {
        margin-bottom: ${({ theme }) => theme.spacing.md};
      }
    }
  }
`;
