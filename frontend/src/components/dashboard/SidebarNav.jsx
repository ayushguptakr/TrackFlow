import NavItem from './NavItem';

const SidebarNav = ({ items, onNavigate }) => (
  <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
      Navigation
    </p>
    {items.map((item) => (
      <NavItem key={item.path} item={item} onNavigate={onNavigate} />
    ))}
  </nav>
);

export default SidebarNav;
