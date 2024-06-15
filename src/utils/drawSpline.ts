import { CompletePoint } from '../types';
import calculatePolynomialOf3Degree from './calculatePolynomialOf3Degree';

const drawSpline = (
	ctx: CanvasRenderingContext2D,
	canvasHeight: number,
	points: CompletePoint[],
	a: number[],
	b: number[],
	c: number[],
	d: number[],
	color: string,
) => {
	const n = points.length - 1;

	ctx.beginPath();
	ctx.moveTo(points[0].x, canvasHeight - points[0].y);

	// Loop through every point
	for (let i = 0; i < n; i++) {
		const x0 = points[i].x;
		const x1 = points[i + 1].x;
		// Draw line between every two points
		for (let x = x0; x <= x1; x++) {
			const y = calculatePolynomialOf3Degree([a[i], b[i], c[i], d[i]], x - x0);
			ctx.lineTo(x, canvasHeight - y);
		}
	}

	ctx.strokeStyle = color;
	ctx.stroke();
};

export default drawSpline;
