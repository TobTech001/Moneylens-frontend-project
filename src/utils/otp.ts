// Frontend-only OTP simulation — no real email is sent. The generated code is
// stored in sessionStorage (not localStorage) so it clears when the tab
// closes, and is shown directly on screen since there's no backend to email
// it. Swap this whole file for a real backend call once one exists.

const OTP_STORAGE_KEY = 'moneylens_demo_otp';

interface StoredOtp {
  email: string;
  code: string;
  createdAt: number;
}

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function storeOtp(email: string, code: string) {
  const payload: StoredOtp = { email, code, createdAt: Date.now() };
  try {
    sessionStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage unavailable — silently no-op, verification will just fail gracefully.
  }
}

export function getStoredOtp(): StoredOtp | null {
  try {
    const raw = sessionStorage.getItem(OTP_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredOtp;
  } catch {
    return null;
  }
}

export function clearOtp() {
  try {
    sessionStorage.removeItem(OTP_STORAGE_KEY);
  } catch {
    // no-op
  }
}

// A short-lived flag set once an OTP is verified, so the Reset Password page
// can confirm the user actually came through verification rather than
// navigating to /reset-password directly. Frontend-only — a real backend
// would use a signed reset token instead.
const OTP_VERIFIED_KEY = 'moneylens_demo_otp_verified';

export function markOtpVerified() {
  try {
    sessionStorage.setItem(OTP_VERIFIED_KEY, '1');
  } catch {
    // no-op
  }
}

export function isOtpVerified(): boolean {
  try {
    return sessionStorage.getItem(OTP_VERIFIED_KEY) === '1';
  } catch {
    return false;
  }
}

export function clearOtpVerified() {
  try {
    sessionStorage.removeItem(OTP_VERIFIED_KEY);
  } catch {
    // no-op
  }
}