import { Header } from '../Header';
import styles from './layout.module.css';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
	header?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
	header = true,
	className,
	children,
}) => {
	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<div className={className}>
					{header && <Header />}
					<main>{children}</main>
				</div>
			</div>
		</div>
	);
};
