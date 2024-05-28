const drawChartBackground = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
) => {
	// clear previous drawing
	ctx.clearRect(0, 0, width, height);

	// background and border
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle = '#cdcdcd';

	// numbers
	ctx.font = '16px sans-serif';
	ctx.fillStyle = 'black';

	// 0,0
	ctx.fillText('0, 0', 12, height - 28);

	// horizontal (every 100)
	for (let i = 100; i <= width; i += 100) {
		ctx.fillStyle = 'black';
		ctx.fillText(i.toString(), i + 36, height - 24);
		ctx.fillStyle = '#dedede';
		ctx.fillRect(i + 47, 0, 2, height - 40);
	}

	// horizontal (every 50)
	for (let i = 50; i <= width; i += 100) {
		ctx.fillStyle = '#fafafa';
		ctx.fillRect(i + 47, 0, 2, height - 40);
	}

	// vertical (every 100)
	for (let i = 100; i <= height; i += 100) {
		ctx.fillStyle = 'black';
		ctx.fillText(i.toString(), 12, height - 43 - i);
		ctx.fillStyle = '#dedede';
		ctx.fillRect(42, height - 49 - i, width - 42, 2);
	}

	// vertical (every 50)
	for (let i = 50; i <= height; i += 100) {
		ctx.fillStyle = '#fafafa';
		ctx.fillRect(42, height - 49 - i, width - 42, 2);
	}

	// stroke around actual chart
	ctx.strokeRect(48, 0, width, height - 48);
};

export default drawChartBackground;
