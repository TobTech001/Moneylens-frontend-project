import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Toast from '../../components/common/Toast';
import ProfileHeader from '../../components/profile/ProfileHeader';
import PersonalInformation from '../../components/profile/PersonalInformation';
import ProfilePicture from '../../components/profile/ProfilePicture';
import EditProfileModal from '../../components/profile/EditProfileModal';
import AccountInformation from '../../components/profile/AccountInformation';
import FinancialProfile from '../../components/profile/FinancialProfile';
import ProfileCompletion from '../../components/profile/ProfileCompletion';
import ProfileInsights from '../../components/profile/ProfileInsights';
import AccountActions from '../../components/profile/AccountActions';
import { MOCK_PROFILE, MOCK_FINANCIAL_PROFILE, computeProfileStats } from '../../data/ProfileData';
import type { FinancialProfile as FinancialProfileType, UserProfile } from '../../types/profile';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [financialProfile, setFinancialProfile] = useState<FinancialProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function load() {
    setIsLoading(true);
    setHasError(false);
    // Frontend-only — simulates a fetch. Swap this for a real service call once the backend exists.
    setTimeout(() => {
      setProfile(MOCK_PROFILE);
      setFinancialProfile(MOCK_FINANCIAL_PROFILE);
      setIsLoading(false);
    }, 700);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const stats = computeProfileStats();

  function handleSaveProfile(updates: Partial<UserProfile>) {
    setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
    setIsEditModalOpen(false);
    setToastMessage('Profile updated successfully.');
  }

  function handleChangePhoto(dataUrl: string) {
    setProfile((prev) => (prev ? { ...prev, avatar: dataUrl } : prev));
    setToastMessage('Profile photo updated successfully.');
  }

  function handleRemovePhoto() {
    setProfile((prev) => (prev ? { ...prev, avatar: null } : prev));
    setToastMessage('Profile photo removed.');
  }

  function handleSaveFinancialProfile(updates: Partial<FinancialProfileType>) {
    setFinancialProfile((prev) => (prev ? { ...prev, ...updates } : prev));
    setToastMessage('Financial profile updated successfully.');
  }

  function handlePasswordChanged() {
    setToastMessage('Password changed successfully.');
  }

  function handleLogout() {
    logout();
    setToastMessage('You have been logged out.');
    navigate('/login');
  }

  function handleAccountDeleted() {
    // Frontend-only simulation — no backend call is made.
    setToastMessage('Your account has been deleted.');
    logout();
    navigate('/login');
  }

  if (hasError) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Profile</h1>
        <ErrorState message="We couldn't load your profile information." onRetry={load} />
      </div>
    );
  }

  const displayProfile = profile ?? MOCK_PROFILE;
  const displayFinancial = financialProfile ?? MOCK_FINANCIAL_PROFILE;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Profile</h1>
        <p className="mt-1 text-sm text-slate">Manage your personal information and MoneyLens account.</p>
      </div>

      <ProfileHeader profile={displayProfile} isLoading={isLoading} onEdit={() => setIsEditModalOpen(true)} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <PersonalInformation profile={displayProfile} isLoading={isLoading} />
          <ProfilePicture
            firstName={displayProfile.firstName}
            lastName={displayProfile.lastName}
            avatar={displayProfile.avatar}
            onChangePhoto={handleChangePhoto}
            onRemovePhoto={handleRemovePhoto}
          />
        </div>

        <div className="space-y-6">
          <AccountInformation profile={displayProfile} isLoading={isLoading} />
          <FinancialProfile financialProfile={displayFinancial} isLoading={isLoading} onSave={handleSaveFinancialProfile} />
          <ProfileCompletion profile={displayProfile} financialProfile={displayFinancial} isLoading={isLoading} />
        </div>
      </div>

      <ProfileInsights stats={stats} isLoading={isLoading} />

      <AccountActions onPasswordChanged={handlePasswordChanged} onLogout={handleLogout} onAccountDeleted={handleAccountDeleted} />

      <EditProfileModal isOpen={isEditModalOpen} profile={displayProfile} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveProfile} />

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}