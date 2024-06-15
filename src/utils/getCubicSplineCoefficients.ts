import Matrix, { solve } from 'ml-matrix';
import { CompletePoint } from '../types';

const getCubicSplineCoefficients = (points: CompletePoint[]) => {
	const n = points.length - 1;

	const a = []; // wyraz wolny
	const b = []; // współczynnik przy x^1
	const c = []; // współczynnik przy x^2
	const d = []; // współczynnik przy x^3
	const h = []; // odległość między punktami

	for (let i = 0; i < n; i++) {
		h[i] = points[i + 1].x - points[i].x;
	}

	const alpha = [];
	for (let i = 1; i < n; i++) {
		alpha[i] =
			(3 / h[i]) * (points[i + 1].y - points[i].y) -
			(3 / h[i - 1]) * (points[i].y - points[i - 1].y);
	}

	const L = new Matrix(n - 1, n - 1);
	const R = new Matrix(n - 1, 1);

	L.set(0, 0, 2 * (h[0] + h[1]));
	L.set(0, 1, h[1]);
	R.set(0, 0, alpha[1]);

	for (let i = 1; i < n - 2; i++) {
		L.set(i, i - 1, h[i]);
		L.set(i, i, 2 * (h[i] + h[i + 1]));
		L.set(i, i + 1, h[i + 1]);
		R.set(i, 0, alpha[i + 1]);
	}

	L.set(n - 2, n - 3, h[n - 2]);
	L.set(n - 2, n - 2, 2 * (h[n - 2] + h[n - 1]));
	R.set(n - 2, 0, alpha[n - 1]);

	// Obliczanie współczynników c
	const cMatrix = solve(L, R);
	for (let i = 1; i < n; i++) {
		c[i] = cMatrix.get(i - 1, 0);
	}

	c[0] = 0;
	c[n] = 0;

	// Obliczanie pozostałych współczynników b i d
	for (let i = 0; i < n; i++) {
		b[i] =
			(points[i + 1].y - points[i].y) / h[i] -
			(h[i] * (c[i + 1] + 2 * c[i])) / 3;
		d[i] = (c[i + 1] - c[i]) / (3 * h[i]);
		a[i] = points[i].y;
	}

	console.table({ a, b, c, d });

	return { a, b, c, d };
};

export default getCubicSplineCoefficients;
