import { Link } from 'react-router-dom';
import clsx from '@utils/clsx';
import LogoIcon from '@/components/UI/icons/Logo';
import styles from './logo.module.css';

interface LogoProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {}

export const Logo: React.FC<LogoProps> = ({
	className,
	href = '/',
	...otherProps
}) => {
	return (
		<Link to={href} className={clsx(styles.logo, className)} {...otherProps}>
			<LogoIcon />
		</Link>
	);
};
