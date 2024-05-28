'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { LINE_COLORS, POINT_COLORS } from '../utils/consts';

interface ColorPickerProps {
	lineColor: string;
	setLineColor: Dispatch<SetStateAction<string>>;
	pointColor: string;
	setPointColor: Dispatch<SetStateAction<string>>;
}

const ColorPicker: FC<ColorPickerProps> = ({
	lineColor,
	setLineColor,
	pointColor,
	setPointColor,
}) => {
	return (
		<div style={{ padding: '1rem' }}>
			<h2>Colors</h2>
			<h3>Point color</h3>
			<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
				{POINT_COLORS.map(color => (
					<div
						onClick={() => setPointColor(color)}
						key={color}
						style={{
							backgroundColor: color,
							width: 40,
							height: 40,
							cursor: 'pointer',
							border: color === pointColor ? '3px solid black' : '',
						}}></div>
				))}
			</div>
			<h3>Line color</h3>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
				{LINE_COLORS.map(color => (
					<div
						onClick={() => setLineColor(color)}
						key={color}
						style={{
							backgroundColor: color,
							width: 40,
							height: 40,
							cursor: 'pointer',
							border: color === lineColor ? '3px solid black' : '',
						}}></div>
				))}
			</div>
		</div>
	);
};

export default ColorPicker;
