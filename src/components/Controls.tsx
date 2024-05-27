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
			<h2>Współrzędne punktów</h2>
			<br />
			<button
				onClick={updatePoints}
				style={{
					background: '#0895F5',
					fontSize: '1.25rem',
					color: 'white',
					paddingLeft: '1rem',
					paddingRight: '1rem',
					height: '40px',
					borderRadius: '0.25rem',
					fontWeight: 'bolder',
					cursor: 'pointer',
				}}>
				Update points
			</button>
		</div>
	);
};

export default Controls;
