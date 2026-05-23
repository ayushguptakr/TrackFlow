import DashboardCard from '../../components/dashboard/DashboardCard';

const SupportDashboard = () => {
  return (
    <DashboardCard>
      <p className="text-sm font-medium text-violet-600">Support workspace</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-900">Ticket queue</h2>
      <p className="mt-2 text-sm text-slate-600">
        Manage and resolve assigned issues from this support dashboard.
      </p>
    </DashboardCard>
  );
};

export default SupportDashboard;
