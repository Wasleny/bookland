import styled from "@emotion/styled";
import Card from "../../Card";

export const StyledReadings = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ReadingCard = styled(Card)`
  > h3 {
    width: 100%;
    max-width: ${({ theme }) => theme.sizes.elementXxl};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    display: block;
  }

  button {
    width: ${({ theme }) => theme.sizes.full};
  }
`;
