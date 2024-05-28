'use client';

import { FC, memo, useCallback, useEffect, useRef } from 'react';
import drawChartBackground from '../utils/drawChartBackground';

interface BackgroundCanvasProps {
	height: number;
}

const BackgroundCanvas: FC<BackgroundCanvasProps> = memo(({ height }) => {
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

	useEffect(() => {
		repaint();
	}, [height, repaint]);

	return (
		<canvas
			id='background-canvas'
			ref={canvasRef}
			width={window.innerWidth}
			height={height}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: -1,
			}}></canvas>
	);
});

export default BackgroundCanvas;
