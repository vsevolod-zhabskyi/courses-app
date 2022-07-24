import Logo from './components/Logo/Logo';
import MyButton from '../../common/MyButton/MyButton';
import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { COURSES_ROUTE } from '../../routeConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { logout } from '../../store/user/actionCreators';
import { useAdmin } from '../../hooks/useAdmin';

function Header() {
	const [isAuthPage, setIsAuthPage] = useState(null);

	const location = useLocation();
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const isAdmin = useAdmin();

	useEffect(() => {
		setIsAuthPage(
			location.pathname === '/login' || location.pathname === '/registration'
		);
	}, [location.pathname]);

	const onLogout = useCallback(() => {
		dispatch(logout());
	}, []);

	return (
		<header className='py-3 d-flex justify-content-between'>
			<div>
				<Link to={COURSES_ROUTE}>
					<Logo />
				</Link>
			</div>
			{!isAuthPage && (
				<div className='d-flex align-items-center'>
					<div className='px-5'>
						Hi, {user.name !== '' ? user.name : isAdmin ? 'Admin' : 'User'}!
					</div>
					<MyButton buttonText='Logout' color='dark' onClick={onLogout} />
				</div>
			)}
		</header>
	);
}

export default Header;
