const getRandomDarkColor = () => {
	// Generate random values for R, G, B channels in the range of 0 to 127 for dark colors
	const r = Math.floor(Math.random() * 128);
	const g = Math.floor(Math.random() * 128);
	const b = Math.floor(Math.random() * 128);

	// Convert each channel to a 2-digit hexadecimal string
	const hexR = r.toString(16).padStart(2, '0');
	const hexG = g.toString(16).padStart(2, '0');
	const hexB = b.toString(16).padStart(2, '0');

	// Combine R, G, B channels into a single hexadecimal color code
	return `#${hexR}${hexG}${hexB}`;
};

export default getRandomDarkColor;
