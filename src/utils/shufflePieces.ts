import { PuzzlePiece } from '../types';

export default function shufflePieces(
  originalCoordinates: { top: number; left: number }[]
): PuzzlePiece[] {
  return originalCoordinates
    .map(({ top, left }, index) => ({
      top,
      left,
      expectedIndex: index,
      actualIndex: index,
    }))
    .sort(() => Math.random() - 0.5)
    .map((piece, actualIndex) => ({ ...piece, actualIndex }));
}
