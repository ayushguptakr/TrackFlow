import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import MobileOverlay from '../components/dashboard/MobileOverlay';
import PageHeader from '../components/dashboard/PageHeader';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import useAuth from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { getNavigationItems } from '../utils/navigation';
import { getRoutePageMeta } from '../utils/pageMeta';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { title, subtitle } = getRoutePageMeta(location.pathname);

  const navItems = getNavigationItems(user?.role);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] lg:flex">
      {sidebarOpen && <MobileOverlay onClick={() => setSidebarOpen(false)} />}

      <Sidebar
        open={sidebarOpen}
        items={navItems}
        user={user}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <TopNavbar title={title} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {subtitle && <PageHeader subtitle={subtitle} />}
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
