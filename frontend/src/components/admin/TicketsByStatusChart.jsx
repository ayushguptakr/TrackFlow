import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card, { CardHeader } from '../ui/Card';
import { formatLabel } from '../../utils/ticketConstants';

const TicketsByStatusChart = ({ data = [] }) => {
  const chartData = data.map((d) => ({ ...d, name: formatLabel(d.name) }));

  return (
    <Card>
      <CardHeader title="Tickets by status" description="Distribution across workflow stages" />
      <div className="h-64 min-h-[256px] w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No ticket data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#a1a1aa" />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e4e4e7',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="value" fill="#18181b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default TicketsByStatusChart;
