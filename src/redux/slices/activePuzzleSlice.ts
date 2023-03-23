import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActivePuzzleOptions, PuzzlePiece } from '../../types';
import divideImage from '../../utils/divideImage';
import shufflePieces from '../../utils/shufflePieces';
import swap from '../../utils/swap';

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
  showUnsolvedPiecesCount: boolean;
  showElapsedTime: boolean;
  showImage: boolean;
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
  showUnsolvedPiecesCount: true,
  showElapsedTime: true,
  showImage: false,
};

export const activePuzzleSlice = createSlice({
  name: 'activePuzzle',
  initialState,
  reducers: {
    load: (
      state,
      action: PayloadAction<{ imageSrc: string; rows: number; columns: number }>
    ) => {
      const { imageSrc, rows, columns } = action.payload;
      const { image, pieceHeight, pieceWidth, topLeftCoordinates } =
        divideImage(imageSrc, rows, columns);

      state.rows = rows;
      state.columns = columns;
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
        swap(state.pieces, index, state.selectedPieceIndex);
        state.selectedPieceIndex = null;
      }
    },
    optionUpdated: (
      state,
      action: PayloadAction<Partial<ActivePuzzleOptions>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { load, handlePieceClick, optionUpdated } =
  activePuzzleSlice.actions;

export default activePuzzleSlice.reducer;
