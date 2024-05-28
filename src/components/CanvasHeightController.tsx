'use client';

import { Dispatch, FC, SetStateAction } from 'react';

interface CanvasHeightControllerProps {
	height: number;
	setHeight: Dispatch<SetStateAction<number>>;
}

const CanvasHeightController: FC<CanvasHeightControllerProps> = ({
	height,
	setHeight,
}) => {
	return (
		<div style={{ padding: '1rem' }}>
			<h2>Chart height</h2>
			<input
				type='number'
				value={height}
				onChange={e => setHeight(parseInt(e.target.value))}
				style={{
					border: '1px solid black',
					padding: '0.25rem 0.5rem',
					fontSize: '1rem',
					borderRadius: '0.25rem',
				}}
			/>
		</div>
	);
};

export default CanvasHeightController;
