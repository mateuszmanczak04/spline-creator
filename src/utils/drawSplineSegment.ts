import calculatePolynomialOf3Degree from './calculatePolynomialOf3Degree';

const drawSplineSegment = (
	ctx: CanvasRenderingContext2D,
	canvasHeight: number,
	startX: number,
	endX: number,
	a: number,
	b: number,
	c: number,
	d: number,
	color: string,
) => {
	ctx.beginPath();
	ctx.moveTo(
		startX,
		canvasHeight - calculatePolynomialOf3Degree({ a, b, c, d, x: startX }),
	);
	for (let x = startX; x <= endX; x += 1) {
		const y = calculatePolynomialOf3Degree({ a, b, c, d, x });
		ctx.lineTo(x, canvasHeight - y);
	}
	ctx.strokeStyle = color;
	ctx.stroke();
};

export default drawSplineSegment;
