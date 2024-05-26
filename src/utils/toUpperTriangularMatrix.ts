/* Tworzy macierz górnotrójkątną
 * @param M macierz w postaci M[h][w], gdzie h to jej wysokość, a w to szerokosć (w = h + 1)
 * @returns
 */
const toUpperTriangularMatrix = (M: number[][]) => {
	const width = M[0].length;
	const height = M.length;

	// dzielimy cały pierwszy rząd tak, by pierwszy element macierzy był równy 1
	const r = M[0][0];
	for (let i = 0; i < width; i++) {
		M[0][i] /= r;
	}

	for (let x = 0; x < width - 1; x++) {
		for (let y = x + 1; y < height; y++) {
			const r = M[y][x] / M[x][x];
			for (let z = x; z < width; z++) {
				M[y][z] = Math.round((M[y][z] - M[x][z] * r) * 1000_000) / 1000_000;
			}
		}
		const d = M[x][x];
		for (let z = x; z < width; z++) {
			M[x][z] /= d;
		}
	}
	return M;
};

export default toUpperTriangularMatrix;
