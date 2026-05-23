const Select = ({ id, label, value, onChange, options, disabled, className = '' }) => (
  <div className={className}>
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label}
      </label>
    )}
    <select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm transition-base hover:border-zinc-300 focus:border-indigo-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100/80 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
