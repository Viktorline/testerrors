import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { Button } from '@/components/UI/Button';
import styles from './notfound.module.css';
import useAppSelector from '@/hooks/useAppSelector';
import { useBtnWatch } from '@/hooks/useBtnWatch';

const NotFound = () => {
	const name = useAppSelector((state) => state.user.data?.name);
	const navigate = useNavigate();

  const [isPressed, btnsHelp] = useBtnWatch()

	const redirect = useCallback(() => {
		navigate(name ? '/themes' : '/');
	}, [name, navigate]);

  useEffect(() => {
    if (isPressed) {
      redirect();
    }
	}, [isPressed, redirect]);

	return (
		<Layout className={styles.container}>
			<Section
				title='Ой, кажется такой страницы не существует'
				className={styles.section}
        srcImg='/images/lostspaceman.png'
			>
				<Button className={styles.btn} onClick={redirect} tip={btnsHelp} autoFocus>
					На главную
				</Button>
			</Section>
		</Layout>
	);
};

export default NotFound;
