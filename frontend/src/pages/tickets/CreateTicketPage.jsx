import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import useAuth from '../../hooks/useAuth';
import * as ticketService from '../../services/ticketService';
import { getErrorMessage } from '../../utils/getErrorMessage';
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  TICKET_CATEGORY,
  TICKET_PRIORITY,
} from '../../utils/ticketConstants';
import { getTicketRoutes } from '../../utils/ticketRoutes';

const CreateTicketPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const routes = getTicketRoutes();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: TICKET_CATEGORY.GENERAL,
    priority: TICKET_PRIORITY.MEDIUM,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required';
    if (!form.description.trim()) next.description = 'Description is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await ticketService.createTicket({
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        priority: form.priority,
      });
      toast.success('Ticket created successfully');
      navigate(routes.ticketDetail(data.data.ticket.id));
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to create ticket'));
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = CATEGORY_OPTIONS.filter((o) => o.value);
  const priorityOptions = PRIORITY_OPTIONS.filter((o) => o.value);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <Link
          to={routes.tickets}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          ← Back to tickets
        </Link>
        <h2 className="mt-3 text-xl font-semibold text-slate-900">Create ticket</h2>
        <p className="mt-1 text-sm text-slate-600">
          Describe the issue and we&apos;ll route it to the right team.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        noValidate
      >
        <Input
          id="title"
          name="title"
          label="Title"
          placeholder="Brief summary of the issue"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
        />

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Provide details, steps to reproduce, expected behavior..."
            value={form.description}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.description
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="mb-1.5 block text-sm font-medium text-slate-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {priorityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" loading={loading} className="!w-auto min-w-[140px]">
            Create ticket
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="!w-auto"
            onClick={() => navigate(routes.tickets)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketPage;
