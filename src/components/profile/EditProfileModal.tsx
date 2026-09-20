import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { NIGERIAN_STATES } from '../../data/ProfileData';
import type { Gender, UserProfile } from '../../types/profile';

const GENDER_OPTIONS: { label: string; value: Gender }[] = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

const STATE_OPTIONS = NIGERIAN_STATES.map((s) => ({ label: s, value: s }));

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+234\s?\d{3}\s?\d{3}\s?\d{4}$/;

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  state?: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (updates: Partial<UserProfile>) => void;
}

export default function EditProfileModal({ isOpen, profile, onClose, onSave }: EditProfileModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender>('Prefer not to say');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isOpen) return;
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setUsername(profile.username);
    setEmail(profile.email);
    setPhone(profile.phone);
    setDateOfBirth(profile.dateOfBirth);
    setGender(profile.gender);
    setCountry(profile.country);
    setState(profile.state);
    setErrors({});
  }, [isOpen, profile]);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!firstName.trim()) next.firstName = 'First name is required.';
    if (!lastName.trim()) next.lastName = 'Last name is required.';
    if (!username.trim()) next.username = 'Username is required.';
    else if (username.trim().length < 3) next.username = 'Username must be at least 3 characters.';
    if (!email) next.email = 'Email is required.';
    else if (!EMAIL_PATTERN.test(email)) next.email = 'Please enter a valid email address.';
    if (!phone) next.phone = 'Phone number is required.';
    else if (!PHONE_PATTERN.test(phone)) next.phone = 'Use a Nigerian number, e.g. +234 801 234 5678.';
    if (!dateOfBirth) next.dateOfBirth = 'Date of birth is required.';
    if (!country.trim()) next.country = 'Country is required.';
    if (!state) next.state = 'State is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onSave({ firstName: firstName.trim(), lastName: lastName.trim(), username: username.trim(), email, phone, dateOfBirth, gender, country: country.trim(), state });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="edit-profile-form">
            Save Changes
          </Button>
        </>
      }
    >
      <form id="edit-profile-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input id="firstName" label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} />
          <Input id="lastName" label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors.lastName} />
        </div>

        <Input id="username" label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} error={errors.username} />

        <Input id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />

        <Input id="phone" label="Phone Number" type="tel" placeholder="+234 801 234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />

        <div className="grid grid-cols-2 gap-3">
          <Input id="dateOfBirth" label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} error={errors.dateOfBirth} />
          <Select id="gender" label="Gender" value={gender} onChange={(e) => setGender(e.target.value as Gender)} options={GENDER_OPTIONS} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input id="country" label="Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} error={errors.country} />
          <Select id="state" label="State" value={state} onChange={(e) => setState(e.target.value)} options={STATE_OPTIONS} error={errors.state} />
        </div>
      </form>
    </Modal>
  );
}