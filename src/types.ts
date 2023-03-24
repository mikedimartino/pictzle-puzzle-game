export type PuzzlePiece = {
  top: number;
  left: number;
  expectedIndex: number;
};

export type ActivePuzzleOptions = {
  showUnsolvedPiecesCount: boolean;
  showElapsedTime: boolean;
  showImageModal: boolean;
  imageModalTop: number;
  imageModalLeft: number;
};
