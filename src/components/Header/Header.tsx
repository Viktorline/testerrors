import { Logo } from '../UI/Logo';
import styles from './header.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<Logo className={styles.logo} />
		</header>
	);
};
