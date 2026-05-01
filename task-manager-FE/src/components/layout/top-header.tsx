import {
  AppBar,
  Avatar,
  // Badge,
  Box,
  IconButton,
  // IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  // Notification,
  TaskSquare,
} from "iconsax-reactjs";
import styles from "../../styles/styles";
import { useState } from "react";
import ProfileActions from "../../pages/auth/profile-actions";
import { useThemeMode } from "../../context/theme-context";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAvatarUrl, getInitials } from "../../utils/functions";

const TopHeader = ({ appBarHeight }: { appBarHeight: number }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, toggleTheme } = useThemeMode();
  const user = useSelector((state: RootState) => state.user);

  // Get avatar image string
  const avatarImg = user?.avatar ? getAvatarUrl(user.avatar) : null;
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        elevation={1}
        sx={{ height: appBarHeight }}>
        <Toolbar sx={{ justifyContent: "space-between", height: appBarHeight }}>
          <Box sx={styles.flexRowOneGapBox}>
            <TaskSquare size="32" color="#1565c0" variant="Bold" />
            <Typography variant="h6" fontWeight={600}>
              Task Management Dashboard
            </Typography>
          </Box>
          <Box sx={styles.flexRowOneGapBox}>
            {/* <IconButton>
              <Badge badgeContent={3} color="error">
                <Notification />
              </Badge>
            </IconButton> */}
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Avatar
              sx={{ ml: 2, cursor: "pointer" }}
              onClick={handleAvatarClick}>
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
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileActions
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
      />
    </>
  );
};
export default TopHeader;
