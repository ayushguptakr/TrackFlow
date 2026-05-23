import Card, { CardHeader } from '../../ui/Card';
import { formatDateTime } from '../../../utils/formatDate';
import { formatLabel } from '../../../utils/ticketConstants';

const InfoRow = ({ label, children }) => (
  <div className="flex items-center justify-between gap-4 py-2.5">
    <dt className="text-sm text-slate-500">{label}</dt>
    <dd className="text-sm font-medium text-slate-900">{children}</dd>
  </div>
);

const TicketInfoPanel = ({ ticket }) => (
  <Card className="p-5">
    <CardHeader title="Ticket information" />
    <dl className="divide-y divide-slate-100">
      <InfoRow label="Ticket ID">
        <span className="font-mono text-xs text-slate-600">{ticket.id?.slice(-8)}</span>
      </InfoRow>
      <InfoRow label="Category">
        <span className="capitalize">{formatLabel(ticket.category)}</span>
      </InfoRow>
      <InfoRow label="Created">{formatDateTime(ticket.createdAt)}</InfoRow>
      <InfoRow label="Last updated">{formatDateTime(ticket.updatedAt)}</InfoRow>
      <InfoRow label="Comments">{ticket.commentCount ?? 0}</InfoRow>
    </dl>
  </Card>
);

export default TicketInfoPanel;
