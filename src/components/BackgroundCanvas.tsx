'use client';

import { FC, useCallback, useEffect, useRef } from 'react';
import { CANVAS_HEIGHT } from '../utils/consts';
import drawChartBackground from '../utils/drawChartBackground';

interface BackgroundCanvasProps {}

const BackgroundCanvas: FC<BackgroundCanvasProps> = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const repaint = useCallback(() => {
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

		drawChartBackground(ctx, canvas.width, canvas.height);
	}, []);

	useEffect(() => {
		repaint();

		const handleWindowResize = () => {
			if (!canvasRef.current) return;
			canvasRef.current.width = window.innerWidth;
			repaint();
		};

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, [repaint]);

	return (
		<canvas
			ref={canvasRef}
			width={window.innerWidth}
			height={CANVAS_HEIGHT}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: -1,
			}}></canvas>
	);
};

export default BackgroundCanvas;
