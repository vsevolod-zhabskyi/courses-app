import { useSelector } from 'react-redux';
import { getUser } from '../store/selectors';
import { ADMIN_ROLE } from '../constants';

export const useAdmin = () => {
	const user = useSelector(getUser);
	return user.role === ADMIN_ROLE;
};
