'use client';

import { FC } from 'react';
import { Point } from '../types';

interface ControlsProps {
	points: Point[];
	addPoint: () => void;
	removePoint: (id: string) => void;
	updatePoint: ({ id, x, y }: { id: string; x?: number; y?: number }) => void;
}

const Controls: FC<ControlsProps> = ({
	points,
	addPoint,
	removePoint,
	updatePoint,
}) => {
	// TODO
	// display 2 inputs for each point, 1st for x position and 1nd for y
	// control their changes
	// remove "Update points" button and display changes immediately
	// replace that button with "Download as image" button, add needed functionality
	// create "Add new point" button which creates a new point with default {x:0, y:0}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				alignItems: 'start',
				padding: '1rem',
			}}>
			<h2>Współrzędne punktów</h2>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
				{points.map(point => (
					<div
						key={point.id}
						style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
						<input
							type='number'
							value={point.x}
							onChange={e => {
								if (!e.target.value || e.target.value.length === 0) {
									updatePoint({ id: point.id, x: 0 });
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
							value={point.y}
							onChange={e => {
								if (!e.target.value || e.target.value.length === 0) {
									updatePoint({ id: point.id, y: 0 });
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
