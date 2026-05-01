import { Box, Grid } from "@mui/material";
import styles from "../../styles/styles";
import SummarySection from "./summary-section";
import TaskOverviewSection from "./task-overview-section";
import TaskStatusSection from "./task-status-section";
import { useEffect, useState } from "react";
import { getAllTasks, getDashboardStats } from "../../api/tasks";
import {
  getChartDataFromStats,
  getSummaryData,
  getTaskOverviewData,
} from "../../utils/dashboard-util";
import { useNavigate } from "react-router-dom";

const colors = ["#4caf50", "#f04c4cff", "#ff9800"];
const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null,
  );
  const [tasksList, setTasksList] = useState<taskData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStats = async () => {
      const res = await getDashboardStats();
      setDashboardStats(res?.stats);
    };
    fetchStats();
    const fetchTasks = async () => {
      const res = await getAllTasks();
      setTasksList(res?.data ?? []);
    };
    fetchTasks();
  }, []);
  const handleCardClick = (status: string) => {
    let statusParam = status;
    if (status === "Total Tasks") {
      statusParam = "All";
    } else if (status === "Completed Tasks") {
      statusParam = "Completed";
    } else if (status === "Pending Tasks") {
      statusParam = "Pending";
    } else if (status === "In Progress Tasks") {
      statusParam = "In Progress";
    }
    navigate(`/tasks?status=${encodeURIComponent(statusParam)}`);
  };
  return (
    <Box>
      <Box sx={{ ...styles.flexColumnTwoGapBox, gap: 5 }}>
        <SummarySection
          summaryData={getSummaryData(
            dashboardStats ?? {
              totalTasks: 0,
              completedTasks: 0,
              pendingTasks: 0,
              inProgressTasks: 0,
            },
          )}
          onCardClick={handleCardClick}
        />
        <Grid container spacing={2}>
          <TaskOverviewSection taskOverview={getTaskOverviewData(tasksList)} />
          <TaskStatusSection
            chartData={getChartDataFromStats(
              dashboardStats ?? {
                totalTasks: 0,
                completedTasks: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
              },
            )}
            colors={colors}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
