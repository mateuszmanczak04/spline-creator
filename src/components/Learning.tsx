import Matrix, { solve } from 'ml-matrix';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Point } from '../types';
import drawPoint from '../utils/drawPoint';

const Learning = () => {
	const [points, setPoints] = useState<Point[]>([
		{ x: 50, y: 50 },
		{ x: 100, y: 150 },
		{ x: 150, y: 25 },
		{ x: 200, y: 125 },
	]);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const repaint = useCallback(() => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext('2d')!;

		ctx.clearRect(0, 0, 400, 300);

		if (!ctx) {
			console.log('ctx is undefined');
			return;
		}

		const A = new Matrix([
			[points[0].x ** 3, points[0].x ** 2, points[0].x, 1],
			[points[1].x ** 3, points[1].x ** 2, points[1].x, 1],
			[points[2].x ** 3, points[2].x ** 2, points[2].x, 1],
			[points[3].x ** 3, points[3].x ** 2, points[3].x, 1],
		]);
		const B = new Matrix([
			[points[0].y],
			[points[1].y],
			[points[2].y],
			[points[3].y],
		]);

		const result = solve(A, B).to2DArray();

		const a = result[0][0];
		const b = result[1][0];
		const c = result[2][0];
		const d = result[3][0];

		const height = canvas.height;
		ctx.moveTo(points[0].x, points[0].y);
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		for (let x = 0; x <= 200; x += 5) {
			const y = a * x ** 3 + b * x ** 2 + c * x + d;
			console.log({ x, y });
			ctx.lineTo(x, height - y);
		}
		ctx.stroke();

		points.forEach(p => drawPoint(ctx, height, p.x, p.y));
	}, [points]);

	useEffect(() => {
		repaint();
	}, [repaint]);

	return (
		<>
			<canvas
				ref={canvasRef}
				width={400}
				height={300}
				style={{
					background: '#eee',
					border: '1px solid black',
					padding: '1rem',
				}}></canvas>
			<div>
				<p>Współrzędne punktów</p>
				<div>
					<span>P1:</span>
					<input
						type='number'
						value={points[0].y}
						onChange={e =>
							setPoints(prev => [
								{ x: prev[0].x, y: parseInt(e.target.value) },
								prev[1],
								prev[2],
								prev[3],
							])
						}
					/>
				</div>
				<div>
					<span>P2:</span>
					<input
						type='number'
						value={points[1].y}
						onChange={e =>
							setPoints(prev => [
								prev[0],
								{ x: prev[1].x, y: parseInt(e.target.value) },
								prev[2],
								prev[3],
							])
						}
					/>
				</div>
				<div>
					<span>P3:</span>
					<input
						type='number'
						value={points[2].y}
						onChange={e =>
							setPoints(prev => [
								prev[0],
								prev[1],
								{ x: prev[2].x, y: parseInt(e.target.value) },
								prev[3],
							])
						}
					/>
				</div>
				<div>
					<span>P3:</span>
					<input
						type='number'
						value={points[3].y}
						onChange={e =>
							setPoints(prev => [
								prev[0],
								prev[1],
								prev[2],
								{ x: prev[3].x, y: parseInt(e.target.value) },
							])
						}
					/>
				</div>
			</div>
		</>
	);
};

export default Learning;
