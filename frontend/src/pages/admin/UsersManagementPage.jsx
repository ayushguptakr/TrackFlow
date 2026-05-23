import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Pagination from '../../components/tickets/Pagination';
import EmptyState from '../../components/tickets/EmptyState';
import Avatar from '../../components/ui/Avatar';
import Card from '../../components/ui/Card';
import useAuth from '../../hooks/useAuth';
import useDebounce from '../../hooks/useDebounce';
import * as adminService from '../../services/adminService';
import { ROLES } from '../../utils/constants';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { formatLabel } from '../../utils/ticketConstants';
import { formatDateTime } from '../../utils/formatDate';

const roleOptions = [
  { value: ROLES.USER, label: 'User' },
  { value: ROLES.SUPPORT, label: 'Support' },
  { value: ROLES.ADMIN, label: 'Admin' },
];

const UsersManagementPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 0, total: 0 });

  const debouncedSearch = useDebounce(filters.search);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: filters.page, limit: filters.limit };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filters.role) params.role = filters.role;

      const { data } = await adminService.getUsers(params);
      setUsers(data.data.users);
      setPagination(data.data.pagination);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load users'));
    } finally {
      setLoading(false);
    }
  }, [filters.page, filters.limit, filters.role, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, role) => {
    setUpdatingId(userId);
    try {
      await adminService.updateUserRole(userId, role);
      toast.success('Role updated');
      fetchUsers();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update role'));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">User management</h2>
        <p className="mt-1 text-sm text-slate-600">View all users and manage their roles</p>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="search"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:col-span-2"
          />
          <select
            value={filters.role}
            onChange={(e) => setFilters((prev) => ({ ...prev, role: e.target.value, page: 1 }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All roles</option>
            {roleOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <EmptyState title="No users found" description="Try adjusting your search or filters." />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {['User', 'Email', 'Role', 'Joined', 'Actions'].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => {
                  const isSelf = u.id === currentUser?.id;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} size="sm" />
                          <span className="font-medium text-slate-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">{u.email}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-700">
                          {formatLabel(u.role)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500">
                        {formatDateTime(u.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        {isSelf ? (
                          <span className="text-xs text-slate-400">Current user</span>
                        ) : (
                          <select
                            value={u.role}
                            disabled={updatingId === u.id}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50"
                          >
                            {roleOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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

export default UsersManagementPage;
