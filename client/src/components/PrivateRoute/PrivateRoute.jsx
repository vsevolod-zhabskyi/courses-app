import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import { COURSES_ROUTE } from '../../routeConstants';
import { ADMIN_ROLE } from '../../constants';

function PrivateRoute({ children }) {
	const user = useSelector(getUser);

	return (
		<>
			{user.role === ADMIN_ROLE ? (
				children
			) : (
				<Navigate to={COURSES_ROUTE} replace />
			)}
		</>
	);
}

export default PrivateRoute;
