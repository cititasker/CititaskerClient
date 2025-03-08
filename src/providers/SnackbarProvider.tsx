import { createContext, useContext, useState, ReactNode, FC } from "react";
import { Snackbar, SnackbarOrigin, Alert } from "@mui/material";

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    severity?: "success" | "info" | "warning" | "error"
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity?: "success" | "info" | "warning" | "error";
  }>({
    open: false,
    message: "",
  });

  const showSnackbar = (
    message: string,
    severity: "success" | "info" | "warning" | "error" = "info"
  ) => {
    setSnackbarState({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={
          { vertical: "top", horizontal: "right" } as SnackbarOrigin
        }
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#00e673",
            color: "#FFFFFF",
          },
        }}
      >
        <Alert
          variant="filled"
          sx={{
            width: "400px",
            backgroundColor:
              snackbarState.severity === "success" ? "#2DBF29" : "#ff3333",
          }}
          onClose={handleClose}
          severity={snackbarState.severity}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
