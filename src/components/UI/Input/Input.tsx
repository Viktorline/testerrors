import { useState } from 'react';
import clsx from '@/utils/clsx';
import styles from './input.module.css';
import { IconClear } from '../icons/IconClear';
import { IconEyeOpen } from '../icons/IconEyeOpen';
import { IconEyeClosed } from '../icons/IconEyeClosed';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tooltip?: string;
  label?: string;
  error?: string | null;
  type?: 'password' | 'text'
  clearBtn?: boolean;
  passwordBtn?: boolean;
  success?: string | null;
  clearCB?: () => void;
}

export const Input: React.FC<InputProps> = ({
  className,
  tooltip,
  label,
  error,
  id,
  type = 'text',
  clearBtn,
  passwordBtn,
  success,
  clearCB = () => { },
  ...otherProps
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [typeInput, setTypeInput] = useState(type);

  const handlerInputPassword = () => {
    setIsOpen(prev => !prev)
    setTypeInput(isOpen ? 'password' : 'text')
  }

  return (
    <div
      className={clsx(
        styles.wrapper,
        error && styles.error,
        success && styles.success,
        className,
      )}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        onKeyDown={(ev:React.KeyboardEvent<HTMLInputElement>) => {
          if(ev.key === 'Enter') {
            ev.preventDefault()
          }
        }}
        className={styles.input}
        id={id}
        type={typeInput}
        {...otherProps}
      />
      <div className={styles.btnWrap}>
        {clearBtn && <button onClick={clearCB}><IconClear /></button>}
        {passwordBtn
          &&
          <button onClick={(e)=> {
            e.preventDefault()
            handlerInputPassword()
          }}>
            {isOpen ? <IconEyeClosed /> : <IconEyeOpen />}
          </button>}
      </div>
      {success && <span className={styles.successMessage}>{success}</span>}
      {error && <span className={styles.errorMessage}>{error}</span>}
      {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
    </div>
  );
};
