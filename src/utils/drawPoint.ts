const drawPoint = (
	ctx: CanvasRenderingContext2D,
	canvasHeight: number,
	x: number,
	y: number,
) => {
	// xOffset is horizontal translation used if point's x is too small
	// to display entire label on the screen
	let xOffset = 0;
	if (x < 50) {
		xOffset = 24 - x;
	}

	ctx.beginPath();
	ctx.moveTo(x, canvasHeight - y);
	ctx.fillStyle = 'red';
	ctx.arc(x, canvasHeight - y, 6, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = 'black';
	const labelSize = ctx.measureText(`${x},${y}`);
	ctx.fillRect(
		x - labelSize.width / 2 - 4 + xOffset,
		canvasHeight - y - 32,
		labelSize.width + 8,
		20,
	);
	ctx.font = '16px sans-serif';
	ctx.fillStyle = 'white';
	ctx.fillText(
		`${x},${y}`,
		x + xOffset - labelSize.width / 2,
		canvasHeight - y - 16,
	);
	return 0;
};

export default drawPoint;
