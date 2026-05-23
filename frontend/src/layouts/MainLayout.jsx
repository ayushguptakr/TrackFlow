import { Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div className="min-h-screen bg-white">
    <Outlet />
  </div>
);

export default MainLayout;
