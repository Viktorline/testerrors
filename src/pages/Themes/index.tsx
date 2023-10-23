import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { logout } from '@/store/slices/user';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/UI/Button';
import styles from './themes.module.css';

const Themes = () => {
	const name = useAppSelector((state) => state.user.data?.name);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!name) navigate('/');
	}, [name, navigate]);

	const handleClick = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	return (
		<Layout className={styles.container} header={false}>
			<Button onClick={handleClick}>Выйти</Button>
		</Layout>
	);
};

export default Themes;
