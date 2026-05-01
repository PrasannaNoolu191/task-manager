import {
  Avatar,
  Box,
  Divider,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "../../styles/styles";
import { useState } from "react";
import LogoutDialog from "./log-out";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAvatarUrl, getInitials } from "../../utils/functions";

interface ProfileActionsProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const ProfileActions = ({ open, anchorEl, onClose }: ProfileActionsProps) => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user);
  const [openConfirmLogout, setOpenConfirmLogout] = useState<{
    open: boolean;
    data: any | null;
  }>({
    open: false,
    data: null,
  });
  const avatarImg = user?.avatar ? getAvatarUrl(user.avatar) : null;
  const navigate = useNavigate();
  const onEditProfile = () => {
    navigate("/edit-profile");
    onClose();
  };
  const onLogout = () => {
    setOpenConfirmLogout({ open: true, data: user });
    onClose();
  };
  const options = [
    { label: "Edit Profile", onClick: onEditProfile },
    {
      label: "Log out",
      onClick: onLogout,
    },
  ];
  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        aria-labelledby="profile-popover">
        <Box p={2}>
          <Box sx={styles.flexRowOneGapBox}>
            <Avatar sx={{ ml: 2, cursor: "pointer" }}>
              {avatarImg ? (
                <img
                  src={avatarImg}
                  alt="Profile"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                getInitials(user?.username || "")
              )}
            </Avatar>
            <Box sx={styles.flexColumnZeroGapBox}>
              <Typography sx={styles.cardHeader}>{user?.username}</Typography>
              <Typography>{user?.email}</Typography>
            </Box>
          </Box>
        </Box>
        {options.map((option) => (
          <Box key={option.label}>
            <Divider sx={{ flexGrow: 1 }} />
            <Box p={2} sx={{ cursor: "pointer" }}>
              <Typography
                sx={{
                  ...styles.profileOptionsText,
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.info.light
                      : theme.palette.primary.main,
                }}
                onClick={option.onClick}
                role="button"
                tabIndex={0}>
                {option.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Popover>
      {openConfirmLogout && (
        <LogoutDialog
          logoutDialogDetails={openConfirmLogout}
          setLogoutDialogDetails={setOpenConfirmLogout}
        />
      )}
    </>
  );
};

export default ProfileActions;
