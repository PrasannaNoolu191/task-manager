import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { Danger, TickCircle } from "iconsax-reactjs";
import { Typography, useTheme } from "@mui/material";

type ToastContextType = {
  showToast: (message: string, severity?: AlertColor) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");
  const theme = useTheme();
  const showToast = (msg: string, sev: AlertColor = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert
          icon={
            severity === "success" ? (
              <TickCircle
                variant="Bold"
                style={{ color: "#3CA662", padding: 0, marginRight: "4px" }}
              />
            ) : (
              <Danger
                variant="Bold"
                style={{ color: "#f04c4cff", padding: 0, marginRight: "4px" }}
              />
            )
          }
          onClose={handleClose}
          //   severity={severity}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.background.paper,
            color:
              severity === "success"
                ? theme.palette.success.main
                : theme.palette.error.main,
            padding: "16px",
            gap: "4px",
            alignItems: "center",
            "& .MuiAlert-icon": { padding: 0, margin: 0 },
            "& .MuiAlert-message": { padding: 0 },
            "& .MuiAlert-action": {
              alignItems: "center",
              paddingTop: 0,
              color: "grey",
            },
          }}>
          <Typography variant="body1"> {message}</Typography>
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
