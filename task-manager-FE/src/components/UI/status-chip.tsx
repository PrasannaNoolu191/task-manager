import { Chip } from "@mui/material";
const statusColors: Record<ICustomChip["status"], string> = {
  Completed: "#4caf50",
  Pending: "#f04c4cff",
  "In Progress": "#ff9800",
};
const CustomChip = (props: ICustomChip) => (
  <Chip
    label={props.status}
    sx={{
      backgroundColor: statusColors[props.status] || "default",
      color: "#fff",
      borderRadius: "4px",
    }}
    size="small"
  />
);

export default CustomChip;
