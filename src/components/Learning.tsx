import { useEffect } from 'react';
import toUpperTriangularMatrix from '../utils/toUpperTriangularMatrix';
// import drawPoint from '../utils/drawPoint';

// type Point = {
// 	x: number;
// 	y: number;
// };

// const points: Point[] = [
// 	{ x: 0, y: 0 },
// 	{ x: 1, y: 2 },
// 	{ x: 2, y: 3 },
// 	{ x: 3, y: 2 },
// 	{ x: 4, y: 4 },
// 	{ x: 5, y: 4 },
// 	{ x: 6, y: 3 },
// ];

const Learning = () => {
	useEffect(() => {
		const M = [
			[4, 6, 2, 4],
			[9, 2, 3, 1],
			[3, 11, 0, 5],
		];
		console.table(toUpperTriangularMatrix(M));
	}, []);

	return <canvas id='splineCanvas' width='800' height='600'></canvas>;
};

export default Learning;
