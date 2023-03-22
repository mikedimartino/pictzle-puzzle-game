import { PuzzlePiece } from '../types';
import swap from './swap';

function swapPiecesInCorrectPosition(pieces: PuzzlePiece[]) {
  const positionsToSwap = pieces.reduce(
    (positions: number[], currPiece: PuzzlePiece, index: number) => {
      if (currPiece.expectedIndex === index) {
        positions.push(index);
      }
      return positions;
    },
    []
  );

  while (positionsToSwap.length > 1) {
    const index1 = positionsToSwap.pop()!;
    const index2 = positionsToSwap.pop()!;
    swap(pieces, index1, index2);
  }

  if (positionsToSwap.length) {
    // Swap one final piece that's still in the right position
    const lastPiecePosition = positionsToSwap.pop()!;
    swap(pieces, lastPiecePosition, (lastPiecePosition + 1) % pieces.length);
  }

  return pieces;
}

export default function shufflePieces(
  originalCoordinates: { top: number; left: number }[]
): PuzzlePiece[] {
  const randomizedPieces = originalCoordinates
    .map(({ top, left }, index) => ({
      top,
      left,
      expectedIndex: index,
    }))
    .sort(() => Math.random() - 0.5);

  // Do another pass, swapping any pieces that are in their correct positions after randomization
  swapPiecesInCorrectPosition(randomizedPieces);

  return randomizedPieces;
}
