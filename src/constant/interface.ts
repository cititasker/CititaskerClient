export interface UseModalReturn {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
  }

  export interface UseToggleReturn {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    toggle: () => void;
  }