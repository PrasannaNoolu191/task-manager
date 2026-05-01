interface SummaryCard {
  title: string;
  value: number;
  color: string;
  icon: JSX.Element;
}
interface TaskOverview {
  name: string;
  status: "Pending" | "In Progress" | "Completed" | string;
}
interface TaskStatus {
  chartData: { name: string; value: number }[];
  colors: string[];
}
interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
}
