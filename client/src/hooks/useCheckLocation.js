import { useLocation } from 'react-router-dom';

export const useCheckLocation = (path) => {
	const location = useLocation();
	return location.pathname.includes(path);
};
