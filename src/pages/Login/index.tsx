import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppSelector from '@/hooks/useAppSelector';
import { Form } from '@/components/Form';
import { Layout } from '@/components/Layout';
import styles from './login.module.css';

const Login = () => {
	const name = useAppSelector((state) => state.user.data?.name);
	const navigate = useNavigate();

	useEffect(() => {
		if (name) navigate('/themes');
	}, [name, navigate]);

	return (
		<Layout className={styles.container}>
			<Form />
		</Layout>
	);
};

export default Login;
