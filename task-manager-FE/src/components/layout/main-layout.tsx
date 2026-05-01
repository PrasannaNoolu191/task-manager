import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import TopHeader from "./top-header";

const drawerWidth = 220;
const appBarHeight = 64;

const MainLayout = () => (
  <Box sx={{ display: "flex", height: "100%", flexDirection: "column" }}>
    {/* Header */}
    <TopHeader appBarHeight={appBarHeight} />
    <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: drawerWidth,
          bgcolor: "#1e293b",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}>
        <Sidebar />
      </Box>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "auto",
        }}>
        <Outlet />
      </Box>
    </Box>
  </Box>
);

export default MainLayout;
