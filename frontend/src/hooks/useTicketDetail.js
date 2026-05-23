import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import * as commentService from '../services/commentService';
import * as ticketService from '../services/ticketService';
import { buildActivityTimeline } from '../utils/buildActivityTimeline';
import { getErrorMessage } from '../utils/getErrorMessage';
import { canUpdateTicket } from '../utils/ticketPermissions';
import { ROLES } from '../utils/constants';

export const canAddComment = (ticket, user) => {
  if (!ticket || !user) return false;
  if (user.role === ROLES.ADMIN) return true;
  return canUpdateTicket(ticket, user) || canViewOwnTicket(ticket, user);
};

const canViewOwnTicket = (ticket, user) => {
  const creatorId = ticket.createdBy?.id;
  return creatorId?.toString() === user.id?.toString();
};

const useTicketDetail = (ticketId, user) => {
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPriority, setUpdatingPriority] = useState(false);

  const fetchTicket = useCallback(async () => {
    const { data } = await ticketService.getTicket(ticketId);
    setTicket(data.data.ticket);
    return data.data.ticket;
  }, [ticketId]);

  const fetchComments = useCallback(async () => {
    const { data } = await commentService.getComments(ticketId, { limit: 100, order: 'asc' });
    setComments(data.data.comments);
    return data.data.comments;
  }, [ticketId]);

  const refresh = useCallback(async () => {
    const [ticketData, commentsData] = await Promise.all([fetchTicket(), fetchComments()]);
    return { ticket: ticketData, comments: commentsData };
  }, [fetchTicket, fetchComments]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setCommentsLoading(true);
      try {
        await Promise.all([fetchTicket(), fetchComments()]);
      } catch (error) {
        toast.error(getErrorMessage(error, 'Failed to load ticket'));
      } finally {
        setLoading(false);
        setCommentsLoading(false);
      }
    };
    load();
  }, [fetchTicket, fetchComments]);

  const updateField = async (field, value, setUpdating) => {
    setUpdating(true);
    try {
      const { data } = await ticketService.updateTicket(ticketId, { [field]: value });
      setTicket(data.data.ticket);
      toast.success(`${field === 'status' ? 'Status' : 'Priority'} updated`);
      await fetchComments();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Update failed'));
      await fetchTicket();
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = (e) => updateField('status', e.target.value, setUpdatingStatus);
  const handlePriorityChange = (e) => updateField('priority', e.target.value, setUpdatingPriority);

  const activity = useMemo(
    () => buildActivityTimeline(ticket, comments),
    [ticket, comments]
  );

  const permissions = useMemo(
    () => ({
      canEdit: canUpdateTicket(ticket, user),
      canComment: canAddComment(ticket, user),
    }),
    [ticket, user]
  );

  return {
    ticket,
    comments,
    activity,
    loading,
    commentsLoading,
    updatingStatus,
    updatingPriority,
    permissions,
    refresh,
    fetchTicket,
    fetchComments,
    handleStatusChange,
    handlePriorityChange,
  };
};

export default useTicketDetail;
