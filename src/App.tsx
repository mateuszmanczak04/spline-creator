import './App.css';
import Chart from './components/Chart';
import Controls from './components/Controls';

const points = [
	{ x: 10, y: 50 },
	{ x: 40, y: 20 },
	{ x: 100, y: 125 },
	{ x: 200, y: 20 },
	{ x: 270, y: 220 },
	{ x: 360, y: 100 },
	{ x: 500, y: 140 },
];

function App() {
	return (
		<div>
			<Chart points={points} />
			<Controls points={points} setPoints={() => {}} />
		</div>
	);
}

export default App;
