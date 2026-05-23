import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PriorityPieChart from '../../components/admin/PriorityPieChart';
import StatCard from '../../components/admin/StatCard';
import TicketsByStatusChart from '../../components/admin/TicketsByStatusChart';
import TicketsTrendChart from '../../components/admin/TicketsTrendChart';
import Card from '../../components/ui/Card';
import * as adminService from '../../services/adminService';
import { ADMIN_ROUTES } from '../../utils/adminRoutes';
import { getErrorMessage } from '../../utils/getErrorMessage';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await adminService.getAnalytics();
        setAnalytics(data.data);
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to load analytics'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-shimmer rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-80 animate-shimmer rounded-xl" />
          <div className="h-80 animate-shimmer rounded-xl" />
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
        <p className="text-sm font-medium text-zinc-700">Could not load analytics</p>
        <p className="mt-1 text-sm text-zinc-500">
          Make sure the backend is running and you are logged in as an admin.
        </p>
      </div>
    );
  }

  const { summary, ticketsByStatus, ticketsByPriority, ticketsTrend } = analytics;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Analytics overview</h2>
          <p className="mt-1 text-sm text-slate-600">System-wide metrics and ticket insights</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={ADMIN_ROUTES.users}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-base hover:border-zinc-300 hover:bg-zinc-50"
          >
            Manage users
          </Link>
          <Link
            to={ADMIN_ROUTES.tickets}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-base hover:bg-zinc-800"
          >
            View all tickets
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={summary?.totalUsers ?? 0} accent="indigo" />
        <StatCard
          label="Total tickets"
          value={summary?.totalTickets ?? 0}
          hint={`${summary?.openTickets ?? 0} open`}
          accent="violet"
        />
        <StatCard
          label="In progress"
          value={summary?.inProgressTickets ?? 0}
          accent="amber"
        />
        <StatCard
          label="Resolved today"
          value={summary?.resolvedToday ?? 0}
          hint={`${summary?.supportAgents ?? 0} support agents`}
          accent="emerald"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open" value={summary?.openTickets ?? 0} accent="slate" />
        <StatCard label="Resolved" value={summary?.resolvedTickets ?? 0} accent="emerald" />
        <StatCard label="Closed" value={summary?.closedTickets ?? 0} accent="slate" />
        <StatCard
          label="Unassigned"
          value={summary?.unassignedTickets ?? 0}
          hint="Needs assignment"
          accent="amber"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TicketsTrendChart data={ticketsTrend || []} />
        <TicketsByStatusChart data={ticketsByStatus || []} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PriorityPieChart data={ticketsByPriority || []} />
        <Card>
          <h3 className="text-sm font-semibold text-slate-900">Users by role</h3>
          <ul className="mt-4 space-y-3">
            {(analytics?.usersByRole || []).map((item) => (
              <li key={item.name} className="flex items-center justify-between text-sm">
                <span className="capitalize text-slate-600">{item.name}</span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-400">
            {summary?.totalComments ?? 0} total comments across all tickets
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
