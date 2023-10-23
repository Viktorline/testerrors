import clsx from '@/utils/clsx';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tip?: string
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  tip,
  ...otherProps
}) => {
  
  return (
    <>
      <button className={clsx(styles.btn, className)} {...otherProps}>
        {children}
      </button>
      {tip && <p className={styles.tip}>
        или нажми <span>{tip}</span>
      </p>}
    </>
  );
};
