import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';

import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyOtp from '../pages/auth/VerifyOtp';
import ResetPassword from '../pages/auth/ResetPassword';

import UserLayout from '../layouts/UserLayout';
import Dashboard from '../pages/user/Dashboard';
import Transactions from '../pages/user/Transactions';
import Analytics from '../pages/user/Analytics';
import Budget from '../pages/user/Budget';
import BorrowLend from '../pages/user/BorrowLend';
import Subscriptions from '../pages/user/Subscriptions';
import Profile from '../pages/user/Profile';
import SettingsLayout from '../components/settings/SettingsLayout';
import SettingsIndexPage from '../pages/user/settings/SettingsIndexPage';
import GeneralSettingsPage from '../pages/user/settings/GeneralSettingsPage';
import AppearanceSettingsPage from '../pages/user/settings/AppearanceSettingsPage';
import NotificationSettingsPage from '../pages/user/settings/NotificationSettingsPage';
import PrivacySettingsPage from '../pages/user/settings/PrivacySettingsPage';
import SecuritySettingsPage from '../pages/user/settings/SecuritySettingsPage';
import FinancialPreferencesPage from '../pages/user/settings/FinancialPreferencePage';
import DataStorageSettingsPage from '../pages/user/settings/DataStorageSettingsPage';
import AccountSettingsPage from '../pages/user/settings/AccountSettingsPage';

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/Users';
import AdminTransactions from '../pages/admin/Transactions';
import AdminCategories from '../pages/admin/Categories';
import AdminReports from '../pages/admin/Reports';
import AdminNotifications from '../pages/admin/Notifications';
import AdminSettings from '../pages/admin/Settings';

import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/borrow-lend" element={<BorrowLend />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<SettingsIndexPage />} />
            <Route path="general" element={<GeneralSettingsPage />} />
            <Route path="appearance" element={<AppearanceSettingsPage />} />
            <Route path="notifications" element={<NotificationSettingsPage />} />
            <Route path="privacy" element={<PrivacySettingsPage />} />
            <Route path="security" element={<SecuritySettingsPage />} />
            <Route path="financial" element={<FinancialPreferencesPage />} />
            <Route path="data" element={<DataStorageSettingsPage />} />
            <Route path="account" element={<AccountSettingsPage />} />
          </Route>
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}