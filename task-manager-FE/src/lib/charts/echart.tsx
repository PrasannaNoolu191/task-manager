import ReactECharts from "echarts-for-react";
import { CSSProperties } from "react";

interface EChartComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: any;
  style?: CSSProperties;
  className?: string;
  height?: string;
  width?: string;
}

const EChart = ({
  option,
  style,
  className,
  height = "100px",
  width = "100%",
}: EChartComponentProps) => {
  return (
    <ReactECharts
      option={option}
      style={style || { height: height, width: width }}
      className={className}
    />
  );
};

export default EChart;
