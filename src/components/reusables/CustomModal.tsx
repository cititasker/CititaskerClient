"use client";
import theme from "@/providers/theme";
import { IconButton, Modal, Paper, SxProps, Theme } from "@mui/material";
import Icons from "../Icons";
import dynamic from "next/dynamic";

const SuccessConfetti = dynamic(() => import("./SuccessConfetti"), {
  ssr: false,
});

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  paperStyle?: SxProps<Theme>;
  showCloseBtn?: boolean;
  confetti?: boolean;
  [key: string]: any;
}

const style: SxProps<Theme> = {
  maxWidth: "800px",
  width: "90%",
  p: "40px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  outline: "none",
  maxHeight: "90vh",
  overflow: "auto",
};

const cancel: SxProps<Theme> = {
  position: "absolute",
  top: "5px",
  right: "5px",

  [theme.breakpoints.up("sm")]: {
    top: "24px",
    right: "24px",
  },
};

const CustomModal = ({
  isOpen,
  onClose,
  children,
  paperStyle,
  showCloseBtn = true,
  confetti = false,
  ...rest
}: IProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} {...rest}>
      <div>
        {confetti && <SuccessConfetti />}
        <Paper sx={{ ...style, ...paperStyle }}>
          {showCloseBtn && (
            <IconButton sx={cancel} onClick={onClose}>
              <Icons.cancel />
            </IconButton>
          )}
          {children}
        </Paper>
      </div>
    </Modal>
  );
};

export default CustomModal;
