import { formatLabel } from '../../utils/ticketConstants';

const styles = {
  low: 'bg-zinc-100 text-zinc-600 ring-zinc-200/80',
  medium: 'bg-sky-50 text-sky-700 ring-sky-200/80',
  high: 'bg-amber-50 text-amber-800 ring-amber-200/80',
  urgent: 'bg-red-50 text-red-700 ring-red-200/80',
};

const PriorityBadge = ({ priority }) => (
  <span
    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition-base ${styles[priority] || styles.medium}`}
  >
    {formatLabel(priority)}
  </span>
);

export default PriorityBadge;
