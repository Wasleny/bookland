import { useEffect, useRef, type ReactNode } from "react";
import { StyledModal } from "./styles";
import { SlClose } from "react-icons/sl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen) dialog.showModal();
    else dialog.close();

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [isOpen, onClose]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;

    if (dialog && e.target === dialog) onClose();
  };

  return (
    <StyledModal ref={dialogRef} onClick={handleClickOutside}>
      <header>
        <SlClose size={30} onClick={onClose} />
      </header>
      {children}
    </StyledModal>
  );
};

export default Modal;
