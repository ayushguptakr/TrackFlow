import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card, { CardHeader } from '../ui/Card';
import { formatLabel } from '../../utils/ticketConstants';

const COLORS = ['#a1a1aa', '#0ea5e9', '#f59e0b', '#ef4444'];

const PriorityPieChart = ({ data = [] }) => {
  const chartData = data.map((d) => ({ ...d, name: formatLabel(d.name) }));

  return (
    <Card>
      <CardHeader title="Tickets by priority" description="Priority breakdown" />
      <div className="h-64 min-h-[256px] w-full">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No ticket data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e4e4e7',
                  fontSize: '13px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default PriorityPieChart;
