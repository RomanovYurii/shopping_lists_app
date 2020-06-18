export const getBeautifiedDate = (x) => {
	const dateString = new Date(x).toString();
	return dateString.substr(4, 17);
};
