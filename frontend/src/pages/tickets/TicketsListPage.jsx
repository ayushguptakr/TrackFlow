import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import EmptyState from '../../components/tickets/EmptyState';
import Pagination from '../../components/tickets/Pagination';
import TicketFilters from '../../components/tickets/TicketFilters';
import TicketTable from '../../components/tickets/TicketTable';
import TicketTableSkeleton from '../../components/tickets/TicketTableSkeleton';
import useAuth from '../../hooks/useAuth';
import useDebounce from '../../hooks/useDebounce';
import * as ticketService from '../../services/ticketService';
import { ROLES } from '../../utils/constants';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { getTicketRoutes } from '../../utils/ticketRoutes';

const defaultFilters = {
  search: '',
  status: '',
  priority: '',
  category: '',
  sortBy: 'createdAt',
  order: 'desc',
  page: 1,
  limit: 10,
};

const TicketsListPage = ({ mode = 'all' }) => {
  const { user } = useAuth();
  const routes = getTicketRoutes();
  const [filters, setFilters] = useState(defaultFilters);
  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(filters.search);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sortBy,
        order: filters.order,
      };

      if (debouncedSearch) params.search = debouncedSearch;
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.category) params.category = filters.category;
      if (mode === 'mine') params.mine = 'true';

      const { data } = await ticketService.getTickets(params);
      setTickets(data.data.tickets);
      setPagination(data.data.pagination);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load tickets'));
    } finally {
      setLoading(false);
    }
  }, [filters.page, filters.limit, filters.sortBy, filters.order, filters.status, filters.priority, filters.category, debouncedSearch, mode]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const isMyTickets = mode === 'mine';
  const showMyTicketsNav = user?.role !== ROLES.USER;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            {isMyTickets ? 'My Tickets' : 'All Tickets'}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
            {isMyTickets
              ? 'Tickets assigned to you or created by you'
              : user?.role === ROLES.USER
                ? 'Your submitted tickets'
                : 'Browse and manage all tickets in the system'}
          </p>
        </div>
        <Link
          to={routes.newTicket}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-base hover:bg-zinc-800 active:scale-[0.98]"
        >
          Create ticket
        </Link>
      </div>

      {showMyTicketsNav && (
        <div className="flex gap-1 border-b border-zinc-200">
          <Link
            to={routes.tickets}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-base ${
              !isMyTickets
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            All tickets
          </Link>
          <Link
            to={routes.myTickets}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-base ${
              isMyTickets
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            My tickets
          </Link>
        </div>
      )}

      <TicketFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <TicketTableSkeleton />
      ) : tickets.length === 0 ? (
        <EmptyState
          title="No tickets found"
          description={
            debouncedSearch || filters.status || filters.priority || filters.category
              ? 'Try adjusting your filters or search term.'
              : 'Get started by creating your first ticket.'
          }
          actionLabel="Create ticket"
          actionTo={routes.newTicket}
        />
      ) : (
        <>
          <TicketTable tickets={tickets} getDetailPath={routes.ticketDetail} />
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </>
      )}
    </div>
  );
};

export default TicketsListPage;
