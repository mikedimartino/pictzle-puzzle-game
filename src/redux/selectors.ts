import { RootState } from './store';

export const selectIsValidPuzzle = (state: RootState) => {
  const { rows, columns, imageHeight, imageWidth } = state.activePuzzle;
  if (
    [rows, columns, imageHeight, imageWidth].some(
      (val) => typeof val !== 'number'
    )
  ) {
    return false;
  }

  if (rows * columns < 2) {
    return false;
  }

  if (imageHeight * imageWidth <= 0) {
    return false;
  }

  return true;
};

export const selectUnsolvedPiecesCount = (state: RootState) => {
  return state.activePuzzle.pieces.filter(
    (piece) => piece.actualIndex !== piece.expectedIndex
  ).length;
};
