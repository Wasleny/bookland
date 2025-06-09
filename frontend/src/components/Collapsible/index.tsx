import { useState, type ReactNode } from "react";
import {
  CollapsibleContainer,
  CollapsibleContent,
  CollapsibleHeader,
  ReadingCollapsibleHeader,
} from "./styles";
import Typography from "../Typography";
import type { Variant } from "../../types/common";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Button from "../Button";
import useIsSmallScreen from "../../hooks/useIsSmallScreen";
import { LuBookPlus } from "react-icons/lu";

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  variantTitle: Variant;
  hasButton: boolean;
  onClick?: () => void;
  nameButton?: string;
}

const Collapsible = ({
  title,
  children,
  variantTitle,
  hasButton = false,
  onClick,
  nameButton,
}: CollapsibleProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsSmallScreen({width: '768px'})

  return (
    <CollapsibleContainer>
      {hasButton ? (
        <ReadingCollapsibleHeader onClick={() => setOpen((prev) => !prev)}>
          <Typography
            variant={variantTitle}
            marginBottom="none"
            marginEnd="none"
            marginStart="none"
            marginTop="none"
          >
            {title} {open ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </Typography>
          <Button
            variant="submit"
            onClick={(e) => {
              if (e) e.stopPropagation();
              if (onClick) onClick();
            }}
          >
            {isMobile ? <LuBookPlus size={30} /> : nameButton}
          </Button>
        </ReadingCollapsibleHeader>
      ) : (
        <CollapsibleHeader onClick={() => setOpen((prev) => !prev)}>
          <Typography
            variant={variantTitle}
            marginBottom="none"
            marginEnd="none"
            marginStart="none"
            marginTop="none"
          >
            {title} {open ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </Typography>
        </CollapsibleHeader>
      )}
      <CollapsibleContent open={open}>{children}</CollapsibleContent>
    </CollapsibleContainer>
  );
};

export default Collapsible;
