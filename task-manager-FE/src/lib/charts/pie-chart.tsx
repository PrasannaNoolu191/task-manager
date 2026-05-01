import { Box, Typography } from "@mui/material";

import { EChartsOption } from "echarts";
import EChart from "./echart";
import styles from "../../styles/styles";
const generateColors = (count: number) => {
  return Array.from(
    { length: count },
    (_, i) => `hsl(${(i * 360) / count}, 70%, 50%)`,
  );
};
const CustomChartCard: React.FC<CustomChartCardProps> = ({
  chartData,
  colors,
}) => {
  const colorsData = colors ?? generateColors(chartData.length);
  const getSumOfValues = (dataArray: { value: number }[]) => {
    let sum = 0;

    if (dataArray && dataArray?.length > 0) {
      dataArray?.forEach((each: { value: number }) => {
        sum = sum + each?.value;
      });
    }

    return sum;
  };
  const chartOptions: EChartsOption = {
    legend: {
      show: false,
      bottom: "5%",
      orient: "horizontal",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["60%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          formatter: function () {
            return `${getSumOfValues(chartData)}\nTotal`;
          },
          fontWeight: "bold",
        },

        data: chartData,
        color: colorsData,
      },
    ],
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <EChart option={chartOptions} height="200px" width="100%" />
      <Box sx={styles.flexRowOneGapBox}>
        {chartData &&
          chartData?.length > 0 &&
          chartData?.map((item, index) => {
            return (
              <Box key={item.name + "-" + index} sx={styles.flexRowOneGapBox}>
                <Typography
                  sx={{
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50px",
                    backgroundColor: colorsData[index],
                  }}></Typography>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: "14px",
                  }}>
                  {item.value} {item.name}
                </Typography>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
export default CustomChartCard;
