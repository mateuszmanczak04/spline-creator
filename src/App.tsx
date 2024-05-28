import { useState } from 'react';
import './App.css';
import BackgroundCanvas from './components/BackgroundCanvas';
import CanvasHeightController from './components/CanvasHeightController';
import Chart from './components/Chart';
import ColorPicker from './components/ColorPicker';
import Controls from './components/Controls';
import DownloadButton from './components/DownloadButton';
import { CompletePoint, Point } from './types';

function App() {
	const [points, setPoints] = useState<Point[]>([
		{ id: crypto.randomUUID(), x: 10, y: 50 },
		{ id: crypto.randomUUID(), x: 40, y: 40 },
		{ id: crypto.randomUUID(), x: 100, y: 125 },
		{ id: crypto.randomUUID(), x: 200, y: 110 },
		{ id: crypto.randomUUID(), x: 400, y: 220 },
		{ id: crypto.randomUUID(), x: 500, y: 400 },
		{ id: crypto.randomUUID(), x: 650, y: 140 },
	]);
	const [pointColor, setPointColor] = useState<string>('red');
	const [lineColor, setLineColor] = useState<string>('#888');
	const [canvasHeight, setCanvasHeight] = useState<number>(
		Math.floor(window.innerHeight / 2),
	);

	// creates a new point with same coordinates as previous latest
	const addPoint = () => {
		const newPoint = {
			id: crypto.randomUUID(),
			x: null,
			y: null,
		};
		setPoints(prev => [...prev, newPoint]);
	};

	const removePoint = (id: string) => {
		setPoints(prev => prev.filter(point => point.id !== id));
	};

	const updatePoint = ({
		id,
		x,
		y,
	}: {
		id: string;
		x?: number | null;
		y?: number | null;
	}) => {
		setPoints(prev =>
			prev.map(point => {
				if (point.id === id) {
					return {
						id,
						x: x !== undefined ? x : point.x,
						y: y !== undefined ? y : point.y,
					};
				}
				return point;
			}),
		);
	};

	return (
		<div>
			<div style={{ position: 'relative' }}>
				<BackgroundCanvas height={canvasHeight} />
				<Chart
					height={canvasHeight}
					pointColor={pointColor}
					lineColor={lineColor}
					points={
						// pass only points with both coordinates existing
						points.filter(
							point => point.x !== null && point.y !== null,
						) as CompletePoint[]
					}
				/>
			</div>
			<CanvasHeightController
				height={canvasHeight}
				setHeight={setCanvasHeight}
			/>
			<DownloadButton />
			<ColorPicker
				pointColor={pointColor}
				setPointColor={setPointColor}
				lineColor={lineColor}
				setLineColor={setLineColor}
			/>
			<Controls
				points={points}
				addPoint={addPoint}
				removePoint={removePoint}
				updatePoint={updatePoint}
			/>
		</div>
	);
}

export default App;
