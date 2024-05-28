'use client';

import { Matrix, solve } from 'ml-matrix';
import { FC, useCallback, useEffect, useRef } from 'react';
import { Point } from '../types';
import calculatePolynomialOf3Degree from '../utils/calculatePolynomialOf3Degree';
import drawPoint from '../utils/drawPoint';
import getRandomDarkColor from '../utils/getRandomDarkColor';

interface ChartProps {
	points: Point[];
}

const Chart: FC<ChartProps> = ({ points }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const repaint = useCallback(() => {
		if (points.length < 2) return;

		const canvas = canvasRef.current;
		if (!canvas) {
			console.error('Canvas not found');
			return;
		}

		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.error('Context not found');
			return;
		}

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 3;
		ctx.fillStyle = '#F53208';
		ctx.strokeStyle = '#21130d';
		const height = canvas.height;

		// let prevEndDerivative =
		// 	(points[1].y - points[0].y) / (points[1].x - points[0].x);
		let prevEndDerivative = 0;

		for (let i = 0; i < points.length - 2; i++) {
			const L = points[i].x;
			const C = points[i + 1].x;
			const R = points[i + 2].x;

			const A = new Matrix([
				[L ** 3, L ** 2, L, 1, 0, 0, 0, 0],
				[C ** 3, C ** 2, C, 1, 0, 0, 0, 0],
				[0, 0, 0, 0, C ** 3, C ** 2, C, 1],
				[0, 0, 0, 0, R ** 3, R ** 2, R, 1],
				[3 * C ** 2, 2 * C, 1, 0, -3 * C ** 2, -2 * C, -1, 0],
				[6 * C, 2, 0, 0, -6 * C, -2, 0, 0],
				[6 * L, 2, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 6 * R, 2, 0, 0],
				[3 * C ** 2, 2 * C, 1, 0, 0, 0, 0, 0], // S0'(C)
				// [0, 0, 0, 0, 3 * C ** 2, 2 * C, 1, 0], // S1'(C)
				// [0, 0, 0, 0, 6 * C, 2, 0, 0], // S1''(C)
			]);

			const B = new Matrix([
				[points[i].y],
				[points[i + 1].y],
				[points[i + 1].y],
				[points[i + 2].y],
				[0],
				[0],
				[0],
				[0],
				// [prevEndDerivative],
				[prevEndDerivative],
				// [prevSecondEndDerivative],
			]);

			const result = solve(A, B).to2DArray();

			const a0 = result[0][0];
			const b0 = result[1][0];
			const c0 = result[2][0];
			const d0 = result[3][0];
			const a1 = result[4][0];
			const b1 = result[5][0];
			const c1 = result[6][0];
			const d1 = result[7][0];

			prevEndDerivative = 3 * a1 * R ** 2 + 2 * b1 * R + c1;

			console.log(a1, b1, c1);
			console.log('ped', prevEndDerivative, R);

			const drawSplineSegment = (
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
					height - calculatePolynomialOf3Degree({ a, b, c, d, x: startX }),
				);
				for (let x = startX; x <= endX; x += 1) {
					const y = calculatePolynomialOf3Degree({ a, b, c, d, x });
					ctx.lineTo(x, height - y);
				}
				ctx.strokeStyle = color;
				ctx.stroke();
			};

			if (i === 0) {
				drawSplineSegment(L, C, a0, b0, c0, d0, 'black');
				drawSplineSegment(C, R, a1, b1, c1, d1, 'black');
			} else {
				drawSplineSegment(C, R, a1, b1, c1, d1, 'black');
			}
		}

		points.forEach(p => drawPoint(ctx, height, p.x, p.y));
	}, [points]);

	useEffect(() => {
		repaint();

		const handleWindowResize = () => {
			if (!canvasRef.current) return;
			canvasRef.current.width = window.innerWidth - 32;
			repaint();
		};

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, [repaint]);

	return (
		<>
			<canvas
				ref={canvasRef}
				width={window.innerWidth - 32}
				height={500}
				style={{
					background: '#efefef',
					padding: '1rem',
					borderBottom: '2px solid #cdcdcd',
				}}></canvas>
		</>
	);
};

export default Chart;
