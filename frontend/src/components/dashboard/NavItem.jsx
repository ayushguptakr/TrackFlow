import { NavLink } from 'react-router-dom';
import { Icons } from './icons';

const NavItem = ({ item, onNavigate }) => {
  const Icon = Icons[item.icon] || Icons.dashboard;

  if (item.comingSoon) {
    return (
      <span
        className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400"
        title="Coming soon"
      >
        <Icon className="h-[18px] w-[18px] shrink-0 opacity-50" />
        <span>{item.label}</span>
        <span className="ml-auto rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Soon
        </span>
      </span>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-base ${
          isActive
            ? 'bg-zinc-900 text-white shadow-sm [&_svg]:text-white'
            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 [&_svg]:text-zinc-400 hover:[&_svg]:text-zinc-600'
        }`
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0 transition-base" />
      <span>{item.label}</span>
    </NavLink>
  );
};

export default NavItem;
