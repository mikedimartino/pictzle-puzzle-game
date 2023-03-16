import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import divideImage from '../../utils/divideImage';

type PuzzlePiece = {
  top: number;
  left: number;
  expectedIndex: number;
  actualIndex: number;
};

type ActivePuzzleSliceState = {
  imageSrc: string;
  rows: number;
  columns: number;
  imageWidth: number;
  imageHeight: number;
  pieceHeight: number;
  pieceWidth: number;
  pieces: PuzzlePiece[];
  selectedPieceIndex: number | null;
};

const initialState: ActivePuzzleSliceState = {
  imageSrc: '',
  rows: 0,
  columns: 0,
  imageWidth: 0,
  imageHeight: 0,
  pieceHeight: 0,
  pieceWidth: 0,
  pieces: [],
  selectedPieceIndex: null,
};

const resetPieces = (originalCoordinates: { top: number, left: number}[]) => {
  return originalCoordinates
    .map(({ top, left }, index) => ({ top, left, expectedIndex: index, actualIndex: index }));
};

export const activePuzzleSlice = createSlice({
  name: 'activePuzzle',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<{ imageSrc: string, rows: number, columns: number }>) => {
      const { imageSrc, rows, columns } = action.payload;
      const { image, pieceHeight, pieceWidth, topLeftCoordinates } = divideImage(imageSrc, rows, columns);

      state.imageSrc = imageSrc;
      state.rows = rows;
      state.columns = columns;
      state.imageWidth = image.width;
      state.imageHeight = image.height;
      state.pieceHeight = pieceHeight;
      state.pieceWidth = pieceWidth;
      state.pieces = resetPieces(topLeftCoordinates);
      state.selectedPieceIndex = null;
    },
    shuffle: (state) => {
      state.selectedPieceIndex = null;
      state.pieces = state.pieces
        .sort(() => Math.random() - 0.5)
        .map((piece, actualIndex) => ({ ...piece, actualIndex }));
    },
    reset: (state) => {
      const { topLeftCoordinates } = divideImage(state.imageSrc, state.rows, state.columns);
      state.pieces = resetPieces(topLeftCoordinates);
      state.selectedPieceIndex = null;
    },
    handlePieceClick: (state, action: PayloadAction<number>) => {
      const index = action.payload;
 
      if (index === state.selectedPieceIndex) {
        state.selectedPieceIndex = null;
      } else if (state.selectedPieceIndex === null) {
        state.selectedPieceIndex = index;
      } else {
        // Swap
        const temp = state.pieces[index];
        state.pieces[index] = state.pieces[state.selectedPieceIndex];
        state.pieces[state.selectedPieceIndex] = temp;
        state.selectedPieceIndex = null;
      }
    }
  }
});

export const { load, shuffle, reset, handlePieceClick } = activePuzzleSlice.actions;

export default activePuzzleSlice.reducer;