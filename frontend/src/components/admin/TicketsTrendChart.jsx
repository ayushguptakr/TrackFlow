import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card, { CardHeader } from '../ui/Card';

const TicketsTrendChart = ({ data = [] }) => (
  <Card>
    <CardHeader title="Tickets created" description="Last 7 days" />
    <div className="h-64 min-h-[256px] w-full">
      {data.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-zinc-400">
          No ticket data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%" minHeight={256}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#a1a1aa" />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#a1a1aa" />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e4e4e7',
                fontSize: '13px',
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#18181b"
              strokeWidth={2}
              dot={{ fill: '#18181b', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  </Card>
);

export default TicketsTrendChart;
