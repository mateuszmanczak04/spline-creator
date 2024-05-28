'use client';

import { FC } from 'react';
import { Point } from '../types';

interface ControlsProps {
	points: Point[];
	addPoint: () => void;
	removePoint: (id: string) => void;
	updatePoint: ({
		id,
		x,
		y,
	}: {
		id: string;
		x?: number | null;
		y?: number | null;
	}) => void;
}

const Controls: FC<ControlsProps> = ({
	points,
	addPoint,
	removePoint,
	updatePoint,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				alignItems: 'start',
				padding: '1rem',
			}}>
			<h2>Points:</h2>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
				{points.length === 0 && <p>No points to display</p>}
				{points &&
					points.length > 0 &&
					points.map(point => (
						<div
							key={point.id}
							style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
							<input
								type='number'
								value={point.x === null ? '' : point.x}
								onChange={e => {
									if (!e.target.value || e.target.value.length === 0) {
										updatePoint({ id: point.id, x: null });
										return;
									}
									updatePoint({ id: point.id, x: parseInt(e.target.value) });
								}}
								placeholder='x'
								style={{
									border: '1px solid black',
									padding: '0.25rem 0.5rem',
									fontSize: '1rem',
									borderRadius: '0.25rem',
								}}
							/>
							<input
								type='number'
								value={point.y === null ? '' : point.y}
								onChange={e => {
									if (!e.target.value || e.target.value.length === 0) {
										updatePoint({ id: point.id, y: null });
										return;
									}
									updatePoint({ id: point.id, y: parseInt(e.target.value) });
								}}
								placeholder='y'
								style={{
									border: '1px solid black',
									padding: '0.25rem 0.5rem',
									fontSize: '1rem',
									borderRadius: '0.25rem',
								}}
							/>
							<button
								onClick={() => removePoint(point.id)}
								style={{
									background: '#F5084A',
									fontSize: '1rem',
									color: 'white',
									padding: '0.25rem 0.5rem',
									borderRadius: '0.25rem',
									fontWeight: 'bolder',
									cursor: 'pointer',
								}}>
								Remove
							</button>
						</div>
					))}
			</div>
			<button
				onClick={addPoint}
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
				Add new Point
			</button>
		</div>
	);
};

export default Controls;
