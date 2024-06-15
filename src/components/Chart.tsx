'use client';

import { FC, useCallback, useEffect, useRef } from 'react';
import { CompletePoint } from '../types';
import drawChartBackground from '../utils/drawChartBackground';
import drawPoint from '../utils/drawPoint';
import drawSpline from '../utils/drawSpline';
import getCubicSplineCoefficients from '../utils/getCubicSplineCoefficients';

interface ChartProps {
	points: CompletePoint[];
	pointColor: string;
	lineColor: string;
	height: number;
}

const Chart: FC<ChartProps> = ({ points, pointColor, lineColor, height }) => {
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

		// Setup background
		drawChartBackground(ctx, canvas.width, canvas.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 3;
		ctx.strokeStyle = lineColor;
		const height = canvas.height;

		try {
			const { a, b, c, d } = getCubicSplineCoefficients(points);

			// Draw lines connecting points
			drawSpline(ctx, height, points, a, b, c, d, lineColor);

			// Draw points as dots
			points.forEach(p => drawPoint(ctx, height, p.x, p.y, pointColor));
		} catch (err) {
			// Code responsible for displaying errors inside canvas
			ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
			ctx.font = '64px sans-serif';
			const textSize = ctx.measureText('Invalid coordinates');
			ctx.fillRect(
				canvas.width / 2 - textSize.width / 2 - 32,
				canvas.height / 2 - 64,
				textSize.width + 64,
				88,
			);
			ctx.fillStyle = 'black';

			ctx.fillText(
				'Invalid coordinates',
				canvas.width / 2 - textSize.width / 2,
				canvas.height / 2,
			);
		}
	}, [points, pointColor, lineColor]);

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

	useEffect(() => {
		repaint();
	}, [height, repaint]);

	return (
		<>
			<canvas
				id='curve-canvas'
				ref={canvasRef}
				width={window.innerWidth - 48}
				height={height - 48}
				style={{
					marginLeft: '48px',
					marginBottom: '48px',
				}}></canvas>
		</>
	);
};

export default Chart;
