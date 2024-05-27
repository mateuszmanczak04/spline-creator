'use client';

import Matrix, { solve } from 'ml-matrix';
import { FC, useCallback, useEffect, useRef } from 'react';
import { Point } from '../types';
import calculatePolynomialOf3Degree from '../utils/calculatePolynomialOf3Degree';
import drawPoint from '../utils/drawPoint';

interface ChartProps {
	points: Point[];
}

const Chart: FC<ChartProps> = ({ points }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const repaint = useCallback(() => {
		// create another fPoints array which essentially is the same
		// points array with a random point added at the end
		// we do it to not break the loop
		const fPoints = points;
		fPoints.push({ x: 10_000, y: 100 });

		// get canvas and context
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext('2d')!;

		if (!ctx) {
			console.error('ctx is undefined');
			return;
		}

		ctx.clearRect(0, 0, 400, 300);
		ctx.lineWidth = 3;
		ctx.fillStyle = '#F53208'; // color of point dots
		ctx.strokeStyle = '#21130d'; // color of line joining points
		const height = canvas.height;

		for (let i = 0; i < fPoints.length - 2; i++) {
			const L = fPoints[i].x; // left point's x
			const C = fPoints[i + 1].x; // center point's x
			const R = fPoints[i + 2].x; // right point's x

			// we use 8x8 matrixes for solving equations system to calculate
			// coefficients for 2 3rd degree spliced functions
			// first 4 elements of array are coefficients of the S0 function
			// last 4 of the S1
			const A = new Matrix([
				// S0(l):
				[L ** 3, L ** 2, L, 1, 0, 0, 0, 0],
				// S0(c):
				[C ** 3, C ** 2, C, 1, 0, 0, 0, 0],
				// S1(c):
				[0, 0, 0, 0, C ** 3, C ** 2, C, 1],
				// S1(r):
				[0, 0, 0, 0, R ** 3, R ** 2, R, 1],
				// S0'(c) - S1'(c) = 0:
				[3 * C ** 2, 2 * C, 1, 0, -3 * C ** 2, -2 * C, -1, 0],
				// S0''(c) - S1''(c) = 0:
				[6 * C, 2, 0, 0, -6 * C, -2, 0, 0],
				// S0'(c) = 0:
				[3 * C ** 2, 2 * C, 1, 0, 0, 0, 0, 0],
				// S1'(c) = 0:
				[0, 0, 0, 0, C ** 3, C ** 2, C, 1],
				// S0'(l) = 0:
				[3 * L ** 2, 2 * L, 1, 0, 0, 0, 0, 0],
				// S1'(r) = 0:
				[0, 0, 0, 0, R ** 3, R ** 2, R, 1],
			]);

			const B = new Matrix([
				[fPoints[i].y], // S0(l)
				[fPoints[i + 1].y], // S0(c)
				[fPoints[i + 1].y], // S1(c)
				[fPoints[i + 2].y], // S1(r)
				[0], // S0'(c) - S1'(c)
				[0], // S0''(c) - S1''(c)
				[0], // S0'(c)
				[0], // S1'(c)
				[0], // S0'(l)
				[0], // S1'(r)
			]);

			const result = solve(A, B).to2DArray();

			// a0, b0, c0 and d0 - coefficients of S0(x)
			// S0(x) = ax^3 + bx^2 + cx + d
			const a0 = result[0][0];
			const b0 = result[1][0];
			const c0 = result[2][0];
			const d0 = result[3][0];

			const drawS0 = () => {
				ctx.moveTo(fPoints[0].x, fPoints[0].y);
				ctx.beginPath();
				ctx.strokeStyle = 'black';
				// draw S0
				// x += 2 means that we draw a straight line every 2 pixels horizontally
				for (let x = fPoints[i].x; x <= fPoints[i + 1].x; x += 1) {
					const y = calculatePolynomialOf3Degree({
						a: a0,
						b: b0,
						c: c0,
						d: d0,
						x,
					});
					ctx.lineTo(x, height - y);
				}
				ctx.stroke();
			};
			drawS0();

			// // function drawing the following functino fragment:
			// const drawS1 = () => {
			// 	// a1, b1, c1 and d1 - coefficients of S1(x)
			// 	// S1(x) = ax^3 + bx^2 + cx + d
			// 	const a1 = result[4][0];
			// 	const b1 = result[5][0];
			// 	const c1 = result[6][0];
			// 	const d1 = result[7][0];

			// 	ctx.moveTo(fPoints[0].x, fPoints[0].y);
			// 	ctx.beginPath();
			// 	ctx.strokeStyle = 'blue';
			// 	// draw S1
			// 	for (let x = C; x <= R; x += 5) {
			// 		const y = calculatePolynomialOf3Degree({
			// 			a: a1,
			// 			b: b1,
			// 			c: c1,
			// 			d: d1,
			// 			x,
			// 		});
			// 		ctx.lineTo(x, height - y);
			// 	}
			// 	ctx.stroke();
			// };
			// drawS1();
		}

		// render points as small circles on top of the line

		fPoints.forEach(p => drawPoint(ctx, height, p.x, p.y));
	}, [points]);

	useEffect(() => {
		repaint();
	}, [repaint]);

	return (
		<>
			<h2>Wykres funkcji:</h2>
			<canvas
				ref={canvasRef}
				width={400}
				height={300}
				style={{
					background: '#eee',
					border: '1px solid black',
					padding: '1rem',
				}}></canvas>
		</>
	);
};

export default Chart;
