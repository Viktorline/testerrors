import clsx from '@/utils/clsx'
import styles from './Loader.module.css'

interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}


export function Loader({ className, ...props }: LoaderProps) {
  return (
    <div className={clsx(styles.loader, className)} {...props}></div>
  )
}
