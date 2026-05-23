import Avatar from '../../ui/Avatar';
import Card, { CardHeader } from '../../ui/Card';
import { formatLabel } from '../../../utils/ticketConstants';

const TicketAssignmentCard = ({ assignee }) => (
  <Card className="p-5">
    <CardHeader
      title="Assigned support"
      description="Agent responsible for this ticket"
    />
    {assignee ? (
      <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <Avatar name={assignee.name} size="lg" />
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{assignee.name}</p>
          <p className="text-sm text-slate-500">{assignee.email}</p>
          <span className="mt-2 inline-flex rounded-md bg-white px-2 py-0.5 text-xs font-medium capitalize text-slate-600 ring-1 ring-slate-200">
            {formatLabel(assignee.role)}
          </span>
        </div>
      </div>
    ) : (
      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
        <p className="text-sm font-medium text-slate-700">Unassigned</p>
        <p className="mt-1 text-xs text-slate-500">
          This ticket is waiting to be picked up by the support team.
        </p>
      </div>
    )}
  </Card>
);

export default TicketAssignmentCard;
