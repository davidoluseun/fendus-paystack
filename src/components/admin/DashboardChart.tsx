import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";
import ChartTooltip from "./ChartTooltip";
import { getDashboardChartData } from "../../utils/getDashboardChartData";

type DashboardChartProps = {
  orders: OrderTypes[];
};

const DashboardChart = ({ orders }: DashboardChartProps) => {
  const chartData = getDashboardChartData(orders);

  return (
    <ResponsiveContainer minWidth={550} height={250}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 5, left: -14, bottom: -8 }}
      >
        <Area dataKey="sales" stroke="#2451b7" fill="#2451b7" />
        <YAxis dataKey="sales" tickCount={7} />
        <XAxis
          dataKey="time"
          tickFormatter={(date) => format(parseISO(date), "MMM")}
        />
        <Tooltip cursor={false} content={<ChartTooltip />} />
        <CartesianGrid horizontal={false} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
