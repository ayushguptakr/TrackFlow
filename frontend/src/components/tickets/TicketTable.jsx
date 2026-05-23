import { Link } from 'react-router-dom';
import { formatLabel } from '../../utils/ticketConstants';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const TicketTable = ({ tickets, getDetailPath }) => (
  <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[var(--shadow-card)]">
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-zinc-100 bg-zinc-50/80">
            {['Ticket', 'Status', 'Priority', 'Category', 'Assignee', 'Created', 'Comments', ''].map(
              (col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="group transition-base hover:bg-zinc-50/80"
            >
              <td className="px-4 py-4">
                <Link
                  to={getDetailPath(ticket.id)}
                  className="font-medium text-zinc-900 transition-base group-hover:text-indigo-600"
                >
                  {ticket.title}
                </Link>
                <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">{ticket.description}</p>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <PriorityBadge priority={ticket.priority} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-zinc-600">
                {formatLabel(ticket.category)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-zinc-600">
                {ticket.assignedTo?.name || (
                  <span className="text-zinc-400">Unassigned</span>
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm tabular-nums text-zinc-500">
                {formatDate(ticket.createdAt)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm tabular-nums text-zinc-600">
                {ticket.commentCount ?? 0}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <Link
                  to={getDetailPath(ticket.id)}
                  className="inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium text-zinc-600 transition-base hover:bg-zinc-100 hover:text-zinc-900"
                >
                  View →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TicketTable;
