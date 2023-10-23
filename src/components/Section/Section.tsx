import clsx from '@/utils/clsx'
import styles from './section.module.css'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string
	img?: boolean
  srcImg?: string
}

export const Section: React.FC<SectionProps> = ({
	children,
	title,
	img = true,
  srcImg = '/images/illustration1.png',
	className,
}) => {
	return (
		<section className={clsx(styles.content, className)}>
			{img && (
				<img
					className={styles.img}
					src={srcImg}
					alt='Иллюстрация'
				/>
			)}
			{title && <h2 className={styles.title}>{title}</h2>}
			{children}
		</section>
	);
};
