import StatusBadge from '../StatusBadge';
import PriorityBadge from '../PriorityBadge';
import { formatDateTime } from '../../../utils/formatDate';
import { formatLabel } from '../../../utils/ticketConstants';

const TicketDetailHeader = ({ ticket }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {formatLabel(ticket.category)}
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{ticket.title}</h1>
      <p className="mt-2 text-sm text-slate-500">
        Opened {formatDateTime(ticket.createdAt)} by{' '}
        <span className="font-medium text-slate-700">{ticket.createdBy?.name}</span>
      </p>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <StatusBadge status={ticket.status} />
      <PriorityBadge priority={ticket.priority} />
    </div>
  </div>
);

export default TicketDetailHeader;
