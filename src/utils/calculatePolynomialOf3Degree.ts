interface Props {
	a: number;
	b: number;
	c: number;
	d: number;
	x: number;
}

const calculatePolynomialOf3Degree = ({ a, b, c, d, x }: Props) => {
	return x * (x * (x * a + b) + c) + d;
};

export default calculatePolynomialOf3Degree;
