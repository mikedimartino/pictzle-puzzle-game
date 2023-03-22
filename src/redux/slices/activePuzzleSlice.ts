import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PuzzlePiece } from '../../types';
import divideImage from '../../utils/divideImage';
import shufflePieces from '../../utils/shufflePieces';

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

export const activePuzzleSlice = createSlice({
  name: 'activePuzzle',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<{ imageSrc: string }>) => {
      const { imageSrc } = action.payload;
      const { image, pieceHeight, pieceWidth, topLeftCoordinates } =
        divideImage(imageSrc, state.rows, state.columns);

      state.imageSrc = imageSrc;
      state.imageWidth = image.width;
      state.imageHeight = image.height;
      state.pieceHeight = pieceHeight;
      state.pieceWidth = pieceWidth;
      state.selectedPieceIndex = null;
      state.pieces = shufflePieces(topLeftCoordinates);
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
        state.pieces[index] = {
          ...state.pieces[state.selectedPieceIndex],
          actualIndex: index,
        };
        state.pieces[state.selectedPieceIndex] = {
          ...temp,
          actualIndex: state.selectedPieceIndex,
        };
        state.selectedPieceIndex = null;
      }
    },
    updateSettings: (
      state,
      action: PayloadAction<{ rows: number; columns: number; imageSrc: string }>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { load, handlePieceClick, updateSettings } =
  activePuzzleSlice.actions;

export default activePuzzleSlice.reducer;
