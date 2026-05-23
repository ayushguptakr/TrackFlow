import { Link } from 'react-router-dom';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { getTicketRoutes } from '../../utils/ticketRoutes';

const UserDashboard = () => {
  const routes = getTicketRoutes();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <DashboardCard className="p-5">
        <p className="text-sm font-medium text-indigo-600">Quick action</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">Create a ticket</h2>
        <p className="mt-2 text-sm text-slate-600">Report a bug or request support.</p>
        <Link
          to={routes.newTicket}
          className="mt-4 inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          New ticket →
        </Link>
      </DashboardCard>
      <DashboardCard className="p-5">
        <p className="text-sm font-medium text-slate-500">Your workspace</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">My tickets</h2>
        <p className="mt-2 text-sm text-slate-600">View and track your submitted issues.</p>
        <Link
          to={routes.myTickets}
          className="mt-4 inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View tickets →
        </Link>
      </DashboardCard>
    </div>
  );
};

export default UserDashboard;
