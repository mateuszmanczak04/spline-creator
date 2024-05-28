import { useState } from 'react';
import './App.css';
import Chart from './components/Chart';
import Controls from './components/Controls';
import { Point } from './types';

function App() {
	const [points, setPoints] = useState<Point[]>([
		{ id: crypto.randomUUID(), x: 10, y: 50 },
		{ id: crypto.randomUUID(), x: 40, y: 20 },
		{ id: crypto.randomUUID(), x: 100, y: 125 },
		{ id: crypto.randomUUID(), x: 200, y: 20 },
		{ id: crypto.randomUUID(), x: 270, y: 220 },
		{ id: crypto.randomUUID(), x: 360, y: 100 },
		{ id: crypto.randomUUID(), x: 400, y: 140 },
	]);

	// creates a new point with same coordinates as previous latest
	const addPoint = () => {
		const latestPoint = points[points.length - 1];
		const newPoint = {
			id: crypto.randomUUID(),
			x: latestPoint.x,
			y: latestPoint.y,
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
		x?: number;
		y?: number;
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
		console.log(points);
	};

	return (
		<div>
			<Chart points={points} />
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
