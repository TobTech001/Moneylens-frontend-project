import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import Input from '../common/Input';
import { IconEye, IconEyeOff, IconLock } from '../Icons';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  hint?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, hint, id, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        id={id}
        label={label}
        type={visible ? 'text' : 'password'}
        icon={<IconLock className="h-[18px] w-[18px]" />}
        error={error}
        hint={hint}
        rightElement={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="grid h-8 w-8 place-items-center rounded-md text-mist transition-colors hover:text-ink"
          >
            {visible ? <IconEyeOff className="h-[18px] w-[18px]" /> : <IconEye className="h-[18px] w-[18px]" />}
          </button>
        }
        {...rest}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;