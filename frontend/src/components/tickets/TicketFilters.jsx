import Card from '../ui/Card';
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from '../../utils/ticketConstants';

const TicketFilters = ({ filters, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value, page: 1 });
  };

  const selectClass =
    'w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm transition-base hover:border-zinc-300 focus:border-indigo-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100/80';

  return (
    <Card className="p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <label htmlFor="search" className="mb-1.5 block text-xs font-medium text-zinc-600">
            Search
          </label>
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Search tickets..."
            value={filters.search}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm transition-base placeholder:text-zinc-400 hover:border-zinc-300 focus:border-indigo-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100/80"
          />
        </div>

        {[
          { id: 'status', label: 'Status', options: STATUS_OPTIONS },
          { id: 'priority', label: 'Priority', options: PRIORITY_OPTIONS },
          { id: 'category', label: 'Category', options: CATEGORY_OPTIONS },
          { id: 'sortBy', label: 'Sort by', options: SORT_OPTIONS },
        ].map(({ id, label, options }) => (
          <div key={id}>
            <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-zinc-600">
              {label}
            </label>
            <select id={id} name={id} value={filters[id]} onChange={handleChange} className={selectClass}>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div>
          <label htmlFor="order" className="mb-1.5 block text-xs font-medium text-zinc-600">
            Order
          </label>
          <select id="order" name="order" value={filters.order} onChange={handleChange} className={selectClass}>
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

export default TicketFilters;
