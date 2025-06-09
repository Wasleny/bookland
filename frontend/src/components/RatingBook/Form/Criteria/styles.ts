import styled from "@emotion/styled";

export const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const AddCriterionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primarySoft};
  border: ${({ theme }) => theme.borders.thick} transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  :hover {
    border-color: ${({ theme }) => theme.colors.primarySoft};
    background-color: transparent;
  }
`;

export const CriteriaList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CriteriaListItem = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  svg {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.alert};
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: ${({ theme }) => theme.sizes.full};
  flex: 1;
`;

export const Switch = styled.label`
  position: relative;
  display: block;
  width: 50px;
  height: 28px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  > span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: ${({ theme }) => theme.radii.lg};

    ::before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 3px;
      top: 3px;
      background-color: ${({ theme }) => theme.colors.background};
      transition: 0.4s;
      border-radius: ${({ theme }) => theme.radii.circle};
    }
  }

  input:checked + span {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  input:checked + span::before {
    transform: translateX(20px);
  }
`;

export const Div = styled.div`
  display: flex;
  width: ${({ theme }) => theme.sizes.full};
`;
