import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../utils/confirm-dialog";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useToast } from "../../context/toast-context";
import { clearUser } from "../../store/slices/auth-slice";
import { useDispatch } from "react-redux";

const LogoutDialog = ({
  logoutDialogDetails,
  setLogoutDialogDetails,
}: LogoutDialogProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const handleClose = () => setLogoutDialogDetails({ open: false, data: null });
  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser());
    showToast("Logged out successfully", "success");
    navigate("/login");
  };

  return (
    <ConfirmDialog
      open={logoutDialogDetails.open}
      title="Confirm Logout"
      message={"Are you sure you want to log out?"}
      icon={
        <HelpRoundedIcon
          sx={{ color: "#1565c0", height: "30px", width: "30px" }}
        />
      }
      confirmText="Log Out"
      confirmColor="primary"
      cancelText="Cancel"
      onConfirm={handleLogout}
      onCancel={handleClose}
    />
  );
};

export default LogoutDialog;
