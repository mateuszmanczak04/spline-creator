'use client';

import { FC } from 'react';

interface DownloadButtonProps {}

const DownloadButton: FC<DownloadButtonProps> = () => {
	const downloadAsImage = () => {
		const backgroundCanvas = document.querySelector(
			'#background-canvas',
		) as HTMLCanvasElement;
		const curveCanvas = document.querySelector(
			'#curve-canvas',
		) as HTMLCanvasElement;
		if (!backgroundCanvas || !curveCanvas) {
			console.error('Canvas not found');
			return;
		}

		const combinedCanvas = document.createElement('canvas');
		combinedCanvas.width = backgroundCanvas.width;
		combinedCanvas.height = backgroundCanvas.height;
		const context = combinedCanvas.getContext('2d');

		if (!context) {
			console.error('Context not found');
			return;
		}

		context.drawImage(backgroundCanvas, 0, 0);
		context.drawImage(curveCanvas, 48, 0);

		const dataURL = combinedCanvas.toDataURL('image/png');

		const anchor = document.createElement('a');
		anchor.href = dataURL;
		anchor.download = 'Spline curve';
		anchor.click();
	};

	return (
		<button
			onClick={downloadAsImage}
			style={{
				marginLeft: 16,
				marginTop: 16,
				background: '#232323',
				fontSize: '1.25rem',
				color: 'white',
				paddingLeft: '1rem',
				paddingRight: '1rem',
				height: '40px',
				borderRadius: '0.25rem',
				fontWeight: 'bolder',
				cursor: 'pointer',
			}}>
			Download as Image
		</button>
	);
};

export default DownloadButton;
