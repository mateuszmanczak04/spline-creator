const calculatePolynomialOf3Degree = (coefficients: number[], x: number) => {
	const [a, b, c, d] = coefficients;
	return x * (x * (x * d + c) + b) + a;
};

export default calculatePolynomialOf3Degree;
