import { Dispatch, SetStateAction } from "react";

export interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>> | any;
}

export interface UseToggleReturn {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  toggle: () => void;
}
