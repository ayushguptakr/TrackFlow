import Avatar from '../ui/Avatar';
import { Icons } from './icons';

const SidebarProfile = ({ user, onLogout }) => (
  <div className="border-t border-zinc-100 p-4">
    <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
      <Avatar name={user?.name} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900">{user?.name}</p>
        <p className="truncate text-xs text-zinc-500">{user?.email}</p>
      </div>
    </div>

    <button
      type="button"
      onClick={onLogout}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-base hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]"
    >
      <Icons.logout className="h-4 w-4" />
      Sign out
    </button>
  </div>
);

export default SidebarProfile;
