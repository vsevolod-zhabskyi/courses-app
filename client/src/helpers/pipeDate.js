export const pipeDate = (dateStr) => {
	const [day, month, year] = dateStr.split('/');
	return new Date(year, month - 1, day).toLocaleDateString('fi-FI');
};
