import { formatLabel } from '../../utils/ticketConstants';

const styles = {
  open: 'bg-blue-50 text-blue-700 ring-blue-200/80',
  in_progress: 'bg-violet-50 text-violet-700 ring-violet-200/80',
  resolved: 'bg-emerald-50 text-emerald-700 ring-emerald-200/80',
  closed: 'bg-zinc-100 text-zinc-600 ring-zinc-200/80',
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition-base ${styles[status] || styles.open}`}
  >
    {formatLabel(status)}
  </span>
);

export default StatusBadge;
