import { Assignment } from "@mui/icons-material";
import { BrifecaseTimer, TruckTime, BrifecaseTick } from "iconsax-reactjs";
export const getSummaryData = (stats: DashboardStats) => [
  {
    title: "Total Tasks",
    value: stats?.totalTasks ?? 0,
    color: "#1565c0",
    icon: (
      <Assignment sx={{ color: "#1565c0", height: "24px", width: "24px" }} />
    ),
  },
  {
    title: "Completed Tasks",
    value: stats?.completedTasks ?? 0,
    color: "#4caf50",
    icon: <BrifecaseTick size="24" color="#4caf50" />,
  },
  {
    title: "Pending Tasks",
    value: stats?.pendingTasks ?? 0,
    color: "#f04c4cff",
    icon: <BrifecaseTimer size="24" color="#f04c4cff" />,
  },
  {
    title: "In Progress Tasks",
    value: stats?.inProgressTasks ?? 0,
    color: "#ff9800",
    icon: <TruckTime size="24" color="#ff9800" />,
  },
];
export const getChartDataFromStats = (stats: DashboardStats) => [
  { name: "Completed", value: stats.completedTasks },
  { name: "Pending", value: stats.pendingTasks },
  { name: "In Progress", value: stats.inProgressTasks },
];
export const getTaskOverviewData = (tasks: taskData[]) => {
  return tasks.map((task) => ({
    name: task.title,
    status: task.status,
  }));
};
