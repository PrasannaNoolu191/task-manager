import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CustomChip from "../../components/UI/status-chip";

const TaskOverviewSection = ({
  taskOverview,
}: {
  taskOverview: TaskOverview[];
}) => {
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 350,
          }}>
          <Table aria-label="task overview" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6" fontWeight={600}>
                    Task Overview
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {taskOverview.map((task) => (
                <TableRow key={task.name}>
                  <TableCell component="th" scope="row">
                    <Typography> {task.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <CustomChip status={task.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};
export default TaskOverviewSection;
