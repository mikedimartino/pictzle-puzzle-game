export default function divideImage(
  src: string,
  rows: number,
  columns: number
) {
  const image = new Image();
  image.src = src;

  const pieceHeight = image.height / rows;
  const pieceWidth = image.width / columns;

  const topLeftCoordinates = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      topLeftCoordinates.push({
        top: r * pieceHeight,
        left: c * pieceWidth,
      });
    }
  }

  return {
    image,
    pieceHeight,
    pieceWidth,
    topLeftCoordinates,
  };
}
