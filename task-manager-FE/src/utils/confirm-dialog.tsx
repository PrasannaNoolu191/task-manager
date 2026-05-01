import {
  Box,
  Button,
  Dialog,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "../styles/styles";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?:
    | "primary"
    | "error"
    | "inherit"
    | "secondary"
    | "success"
    | "info"
    | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  icon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "primary",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const theme = useTheme();
  return (
    <Dialog open={open} slotProps={{ paper: { sx: { width: "60vh" } } }}>
      <Box>
        <Box
          sx={{
            ...styles.flexCenterAlignedBox,
            // backgroundColor: "#e0e0e0"
            backgroundColor: theme.palette.background.header,
          }}
          padding={2}
          gap={1}>
          {icon}
          <Typography sx={styles.cardHeader}>{title}</Typography>
        </Box>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <Box p={2}>
        <Typography align="center" lineHeight={"25px"}>
          {message}
        </Typography>
        <Box sx={styles.flexRowOneGapBox} mt={2} justifyContent={"center"}>
          <Button
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
            sx={{ ...styles.button, padding: "8px 16px" }}>
            {confirmText}
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={onCancel}
            sx={styles.cancelButton}>
            {cancelText}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
