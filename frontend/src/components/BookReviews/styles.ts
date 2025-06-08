import styled from "@emotion/styled";

export const ReviewsSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.lg};

  h2 {
    margin: ${({ theme }) => theme.spacing.none};
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