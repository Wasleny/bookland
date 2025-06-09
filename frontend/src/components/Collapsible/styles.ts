import styled from "@emotion/styled";

export const CollapsibleContainer = styled.div`
  overflow: hidden;
`;

export const CollapsibleHeader = styled.header`
  all: unset;
  cursor: pointer;
  width: ${({ theme }) => theme.sizes.full};
  display: flex;
  justify-content: baseline;
  align-items: center;

  svg {
    vertical-align: middle;
  }
`;

export const ReadingCollapsibleHeader = styled(CollapsibleHeader)`
  justify-content: space-between;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    button {
      width: fit-content;
      border-radius: ${({ theme }) => theme.radii.xl};
      padding: ${({ theme }) => theme.spacing.ssm};
    }
  }
`;

export const CollapsibleContent = styled.div<{ open: boolean }>`
  max-height: ${({ open, theme }) => (open ? "fit-content" : theme.sizes.none)};
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: justify;
`;
