import Card, { CardHeader } from '../../ui/Card';
import Select from '../../ui/Select';
import StatusBadge from '../StatusBadge';
import PriorityBadge from '../PriorityBadge';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../../utils/ticketConstants';

const statusChoices = STATUS_OPTIONS.filter((o) => o.value);
const priorityChoices = PRIORITY_OPTIONS.filter((o) => o.value);

const TicketUpdateControls = ({
  status,
  priority,
  canEdit,
  updatingStatus,
  updatingPriority,
  onStatusChange,
  onPriorityChange,
}) => (
  <Card className="p-5">
    <CardHeader title="Update ticket" description="Change status and priority" />
    {canEdit ? (
      <div className="space-y-4">
        <Select
          id="status"
          label="Status"
          value={status}
          onChange={onStatusChange}
          disabled={updatingStatus}
          options={statusChoices}
        />
        <Select
          id="priority"
          label="Priority"
          value={priority}
          onChange={onPriorityChange}
          disabled={updatingPriority}
          options={priorityChoices}
        />
      </div>
    ) : (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
          <span className="text-xs font-medium text-slate-500">Status</span>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
          <span className="text-xs font-medium text-slate-500">Priority</span>
          <PriorityBadge priority={priority} />
        </div>
        <p className="text-xs text-slate-400">
          You don&apos;t have permission to update this ticket.
        </p>
      </div>
    )}
  </Card>
);

export default TicketUpdateControls;
