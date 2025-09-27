import React from "react";
import {
  FeedbackAction,
  FeedbackType,
  UniversalFeedbackModalProps,
} from "../constants";
import UniversalFeedbackModal from "../UniversalFeedbackModal";

export const useFeedbackModal = () => {
  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    type: FeedbackType;
    title?: string;
    message: string;
    actions?: FeedbackAction[];
    autoClose?: number;
    showActionBtn?: boolean;
  }>({
    isOpen: false,
    type: "success",
    message: "",
    showActionBtn: false,
  });

  const showModal = React.useCallback(
    (params: {
      type: FeedbackType;
      title?: string;
      message: string;
      actions?: FeedbackAction[];
      autoClose?: number;
      showActionBtn?: boolean;
    }) => {
      setModalState({
        isOpen: true,
        showActionBtn: false,
        ...params,
      });
    },
    []
  );

  const hideModal = React.useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const showSuccess = React.useCallback(
    (
      message: string,
      options?: {
        title?: string;
        autoClose?: number;
        actions?: FeedbackAction[];
      }
    ) => {
      showModal({
        type: "success",
        message,
        ...options,
      });
    },
    [showModal]
  );

  const showError = React.useCallback(
    (
      message: string,
      options?: {
        title?: string;
        actions?: FeedbackAction[];
      }
    ) => {
      showModal({
        type: "error",
        message,
        ...options,
      });
    },
    [showModal]
  );

  const showWarning = React.useCallback(
    (
      message: string,
      options?: {
        title?: string;
        actions?: FeedbackAction[];
      }
    ) => {
      showModal({
        type: "warning",
        message,
        ...options,
      });
    },
    [showModal]
  );

  const showInfo = React.useCallback(
    (
      message: string,
      options?: {
        title?: string;
        autoClose?: number;
        actions?: FeedbackAction[];
      }
    ) => {
      showModal({
        type: "info",
        message,
        ...options,
      });
    },
    [showModal]
  );

  return {
    modalState,
    showModal,
    hideModal,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    FeedbackModal: (
      props: Omit<
        UniversalFeedbackModalProps,
        "isOpen" | "onClose" | "type" | "message"
      >
    ) => (
      <UniversalFeedbackModal
        {...props}
        isOpen={modalState.isOpen}
        onClose={hideModal}
        type={modalState.type}
        message={modalState.message}
        title={modalState.title}
        showActionBtn={modalState.showActionBtn}
        actions={modalState.actions}
        autoClose={modalState.autoClose}
      />
    ),
  };
};
