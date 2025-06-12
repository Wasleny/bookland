import type { ReactNode } from "react";
import Typography from "../Typography";
import { StyledArticle, StyledHeader, StyledSection } from "./styles";

interface OverviewCardProps {
  title: ReactNode;
  amount: number;
  children: ReactNode;
}

const OverviewCard = ({ title, amount, children }: OverviewCardProps) => {
  return (
    <StyledArticle>
      <StyledHeader>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h2">{amount}</Typography>
      </StyledHeader>
      <StyledSection>{children}</StyledSection>
    </StyledArticle>
  );
};

export default OverviewCard;
