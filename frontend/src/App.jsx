import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import GuestRoute from './components/routes/GuestRoute';
import LegacyRedirect from './components/routes/LegacyRedirect';
import ProtectedRoute from './components/routes/ProtectedRoute';
import RoleDashboard from './components/routes/RoleDashboard';
import RoleRoute from './components/routes/RoleRoute';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AllTickets from './pages/AllTickets';
import CreateTicket from './pages/CreateTicket';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyTickets from './pages/MyTickets';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import Users from './pages/Users';
import TicketDetailPage from './pages/tickets/TicketDetailPage';
import { ROLES, ROUTES } from './utils/constants';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#18181b',
            border: '1px solid #e4e4e7',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
            fontSize: '13px',
            fontWeight: '500',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#18181b', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#dc2626', secondary: '#fff' },
          },
        }}
      />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          </Route>
        </Route>

        <Route path="/admin/dashboard" element={<LegacyRedirect />} />
        <Route path="/admin/dashboard/*" element={<LegacyRedirect />} />
        <Route path="/support/dashboard" element={<LegacyRedirect />} />
        <Route path="/support/dashboard/*" element={<LegacyRedirect />} />
        <Route path="/dashboard/tickets/*" element={<LegacyRedirect />} />
        <Route path="/dashboard/tickets" element={<LegacyRedirect />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<RoleDashboard />} />
            <Route path={ROUTES.TICKETS} element={<AllTickets />} />
            <Route path={ROUTES.TICKETS_MINE} element={<MyTickets />} />
            <Route path={ROUTES.CREATE_TICKET} element={<CreateTicket />} />
            <Route path="/tickets/:id" element={<TicketDetailPage />} />

            <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path={ROUTES.USERS} element={<Users />} />
            </Route>
          </Route>
        </Route>

        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
