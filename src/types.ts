export type PuzzlePiece = {
  top: number;
  left: number;
  expectedIndex: number;
};

export type ActivePuzzleOptions = {
  showUnsolvedPiecesCount: boolean;
  showElapsedTime: boolean;
  showImage: boolean;
};
