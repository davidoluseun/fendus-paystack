import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import ChartTooltip from "./ChartTooltip";

type DashboardChartProps = {
  stats: StatsTypes[];
};

const DashboardChart = ({ stats }: DashboardChartProps) => {
  return (
    <ResponsiveContainer minWidth={550} height={250}>
      <AreaChart
        data={stats}
        margin={{ top: 10, right: 5, left: -14, bottom: -8 }}
      >
        <Area dataKey="sales" stroke="#2451b7" fill="#2451b7" />
        <YAxis dataKey="sales" tickCount={7} />
        <XAxis dataKey="month" />
        <Tooltip cursor={false} content={<ChartTooltip />} />
        <CartesianGrid horizontal={false} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
