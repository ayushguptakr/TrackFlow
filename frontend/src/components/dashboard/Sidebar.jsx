import Logo from './Logo';
import SidebarNav from './SidebarNav';
import SidebarProfile from './SidebarProfile';
import { Icons } from './icons';

const Sidebar = ({ open, items, user, onClose, onLogout }) => (
  <aside
    className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-zinc-200/80 bg-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:static lg:z-auto lg:translate-x-0 ${
      open ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full'
    }`}
  >
    <div className="flex h-[60px] items-center justify-between px-4">
      <Logo onClick={onClose} />
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-2 text-zinc-500 transition-base hover:bg-zinc-100 hover:text-zinc-900 lg:hidden"
        aria-label="Close menu"
      >
        <Icons.close className="h-5 w-5" />
      </button>
    </div>

    <SidebarNav items={items} onNavigate={onClose} />

    <SidebarProfile user={user} onLogout={onLogout} />
  </aside>
);

export default Sidebar;
