import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ActivityTimeline from '../../components/tickets/detail/ActivityTimeline';
import CommentsSection from '../../components/tickets/detail/CommentsSection';
import TicketAssignmentCard from '../../components/tickets/detail/TicketAssignmentCard';
import TicketDescription from '../../components/tickets/detail/TicketDescription';
import TicketDetailHeader from '../../components/tickets/detail/TicketDetailHeader';
import TicketDetailSkeleton from '../../components/tickets/detail/TicketDetailSkeleton';
import TicketInfoPanel from '../../components/tickets/detail/TicketInfoPanel';
import TicketUpdateControls from '../../components/tickets/detail/TicketUpdateControls';
import AssignAgentControl from '../../components/admin/AssignAgentControl';
import DeleteTicketButton from '../../components/admin/DeleteTicketButton';
import Card from '../../components/ui/Card';
import useAuth from '../../hooks/useAuth';
import useTicketDetail from '../../hooks/useTicketDetail';
import { ROLES } from '../../utils/constants';
import * as commentService from '../../services/commentService';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { getTicketRoutes } from '../../utils/ticketRoutes';

const TicketDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const routes = getTicketRoutes();
  const isAdmin = user?.role === ROLES.ADMIN;

  const {
    ticket,
    comments,
    activity,
    loading,
    commentsLoading,
    updatingStatus,
    updatingPriority,
    permissions,
    refresh,
    handleStatusChange,
    handlePriorityChange,
  } = useTicketDetail(id, user);

  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    try {
      await commentService.addComment(id, { text: commentText.trim() });
      setCommentText('');
      toast.success('Comment added');
      await refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to add comment'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <TicketDetailSkeleton />;

  if (!ticket) {
    return (
      <Card>
        <p className="text-slate-600">Ticket not found.</p>
        <Link to={routes.tickets} className="mt-4 inline-block text-sm font-medium text-indigo-600">
          ← Back to tickets
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to={routes.tickets}
        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        ← Back to tickets
      </Link>

      <TicketDetailHeader ticket={ticket} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <TicketDescription description={ticket.description} />
          <ActivityTimeline events={activity} loading={commentsLoading} />
          <CommentsSection
            comments={comments}
            commentCount={ticket.commentCount}
            loading={commentsLoading}
            commentText={commentText}
            onCommentChange={(e) => setCommentText(e.target.value)}
            onSubmit={handleAddComment}
            submitting={submitting}
            canComment={permissions.canComment}
          />
        </div>

        <aside className="space-y-4">
          <TicketUpdateControls
            status={ticket.status}
            priority={ticket.priority}
            canEdit={permissions.canEdit}
            updatingStatus={updatingStatus}
            updatingPriority={updatingPriority}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />
          {isAdmin ? (
            <>
              <AssignAgentControl ticket={ticket} onAssigned={refresh} />
              <TicketAssignmentCard assignee={ticket.assignedTo} />
            </>
          ) : (
            <TicketAssignmentCard assignee={ticket.assignedTo} />
          )}
          <TicketInfoPanel ticket={ticket} />
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-slate-900">Reporter</h3>
            <div className="mt-3">
              <p className="text-sm font-medium text-slate-900">{ticket.createdBy?.name}</p>
              <p className="text-xs text-slate-500">{ticket.createdBy?.email}</p>
            </div>
          </Card>
          {isAdmin && (
            <Card className="p-5">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Danger zone</h3>
              <DeleteTicketButton ticketId={ticket.id} redirectTo={routes.tickets} />
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
};

export default TicketDetailPage;
