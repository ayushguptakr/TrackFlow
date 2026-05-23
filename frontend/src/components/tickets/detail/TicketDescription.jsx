import Card, { CardHeader } from '../../ui/Card';

const TicketDescription = ({ description }) => (
  <Card>
    <CardHeader title="Description" description="Full details of this issue" />
    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{description}</p>
  </Card>
);

export default TicketDescription;
