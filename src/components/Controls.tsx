'use client';

import { FC } from 'react';
import { Point } from '../types';

interface ControlsProps {
	points: Point[];
	setPoints: (newPoints: Point[]) => void;
}

const Controls: FC<ControlsProps> = ({ points, setPoints }) => {
	const updatePoints = () => {
		setPoints(points);
	};

	return (
		<div>
			<p>Współrzędne punktów</p>
			{points.slice(0, points.length - 1).map((p, index) => (
				<p key={`${p.x}_${p.y}`}>
					<span>{index}.</span>
					<span style={{ marginLeft: '8px', fontWeight: 'bolder' }}>X:</span>
					<span>{p.x}</span>
					<span style={{ marginLeft: '8px', fontWeight: 'bolder' }}>Y:</span>
					<span>{p.y}</span>
				</p>
			))}
			<button onClick={updatePoints}>Update points</button>
		</div>
	);
};

export default Controls;
