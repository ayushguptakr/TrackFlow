import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card, { CardHeader } from '../ui/Card';
import Select from '../ui/Select';
import * as adminService from '../../services/adminService';
import * as ticketService from '../../services/ticketService';
import { getErrorMessage } from '../../utils/getErrorMessage';

const AssignAgentControl = ({ ticket, onAssigned }) => {
  const [agents, setAgents] = useState([]);
  const [assigneeId, setAssigneeId] = useState(ticket?.assignedTo?.id || '');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAgents = async () => {
      setLoading(true);
      try {
        const { data } = await adminService.getSupportAgents();
        setAgents(data.data.agents);
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to load agents'));
      } finally {
        setLoading(false);
      }
    };
    loadAgents();
  }, []);

  useEffect(() => {
    setAssigneeId(ticket?.assignedTo?.id || '');
  }, [ticket?.assignedTo?.id]);

  const handleAssign = async () => {
    setSaving(true);
    try {
      await ticketService.updateTicket(ticket.id, {
        assignedTo: assigneeId || null,
      });
      toast.success(assigneeId ? 'Support agent assigned' : 'Ticket unassigned');
      onAssigned?.();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to assign agent'));
    } finally {
      setSaving(false);
    }
  };

  const options = [
    { value: '', label: 'Unassigned' },
    ...agents.map((agent) => ({
      value: agent.id,
      label: `${agent.name} (${agent.role})`,
    })),
  ];

  return (
    <Card className="p-5">
      <CardHeader
        title="Assign support"
        description="Assign a support agent to this ticket"
      />
      <Select
        id="assignee"
        label="Support agent"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        options={options}
        disabled={loading || saving}
      />
      <button
        type="button"
        onClick={handleAssign}
        disabled={loading || saving}
        className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-base hover:bg-zinc-800 disabled:opacity-50 active:scale-[0.98]"
      >
        {saving ? 'Saving...' : 'Save assignment'}
      </button>
    </Card>
  );
};

export default AssignAgentControl;
