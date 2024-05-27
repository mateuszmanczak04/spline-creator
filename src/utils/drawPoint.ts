const drawPoint = (
	ctx: CanvasRenderingContext2D,
	canvasHeight: number,
	x: number,
	y: number,
) => {
	ctx.beginPath();
	ctx.moveTo(x, canvasHeight - y);
	ctx.arc(x, canvasHeight - y, 6, 0, Math.PI * 2);
	ctx.fill();
	return 0;
};

export default drawPoint;
