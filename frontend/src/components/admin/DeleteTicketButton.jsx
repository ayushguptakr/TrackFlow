import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConfirmDialog from '../ui/ConfirmDialog';
import * as ticketService from '../../services/ticketService';
import { getErrorMessage } from '../../utils/getErrorMessage';

const DeleteTicketButton = ({ ticketId, redirectTo }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await ticketService.deleteTicket(ticketId);
      toast.success('Ticket deleted');
      navigate(redirectTo);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to delete ticket'));
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 shadow-sm transition-base hover:border-red-300 hover:bg-red-50 active:scale-[0.98]"
      >
        Delete ticket
      </button>

      <ConfirmDialog
        open={open}
        onClose={() => !deleting && setOpen(false)}
        onConfirm={handleDelete}
        title="Delete ticket?"
        message="This will permanently remove the ticket and all its comments. This action cannot be undone."
        confirmLabel="Delete"
        loading={deleting}
        variant="danger"
      />
    </>
  );
};

export default DeleteTicketButton;
