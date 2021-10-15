export const wordToArr = (obj) => {
	if (obj) {
		return Object.keys(obj).map((key) => ({
			title: key.charAt(0).toUpperCase() + key.slice(1),
			content: obj[key],
		}));
	}
};
