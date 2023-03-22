import { PuzzlePiece } from '../types';
import randomize from './randomize';
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
  const pieces = originalCoordinates.map(({ top, left }, index) => ({
    top,
    left,
    expectedIndex: index,
  }));

  randomize(pieces);

  // Do another pass, swapping any pieces that are in their correct positions after randomization
  swapPiecesInCorrectPosition(pieces);

  return pieces;
}
