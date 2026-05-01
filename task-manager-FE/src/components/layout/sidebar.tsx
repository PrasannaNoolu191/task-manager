import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dropbox, Task } from "iconsax-reactjs";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/dashboard",
    icon: <Dropbox />,
    activeIcon: <Dropbox variant="Bold" />,
    label: "Dashboard",
  },
  {
    to: "/tasks",
    icon: <Task />,
    activeIcon: <Task variant="Bold" />,
    label: "Tasks",
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <Box
      sx={{
        backgroundColor: "#1e293b",
        color: "#fff",
        p: 2,
      }}>
      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              sx={{
                color: "white",
                borderRadius: 2,
                width: "100%",
                display: "flex",
                alignItems: "center",
                "&.active": {
                  backgroundColor: "#1565c0",
                  color: "#fff",
                },
              }}>
              <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
                {isActive ? item.activeIcon : item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    fontWeight: isActive ? 700 : 400,
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};
export default Sidebar;
