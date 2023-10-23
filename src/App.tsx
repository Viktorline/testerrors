import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Themes from './pages/Themes';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<Navigate to='/not-found' />} />
				<Route path='/not-found' element={<NotFound />} />
				<Route path='/themes' element={<Themes />} />
				<Route path='/' element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
