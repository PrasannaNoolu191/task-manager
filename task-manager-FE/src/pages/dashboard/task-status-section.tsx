import { Box, Card, Grid, Typography } from "@mui/material";
import PieChartComponent from "../../lib/charts/pie-chart";
const TaskStatusSection = ({ chartData, colors }: TaskStatus) => {
  return (
    <>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <Card sx={{ borderRadius: 2 }}>
          <Box
            sx={{
              padding: "16px",
              backgroundColor: (theme) => theme.palette.background.paper,
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}>
            <Typography fontWeight={600} variant="h6">
              Task Status Chart
            </Typography>
          </Box>
          <Box p="16px">
            <PieChartComponent chartData={chartData ?? null} colors={colors} />
          </Box>
        </Card>
      </Grid>
    </>
  );
};
export default TaskStatusSection;
