import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { selectIsFinished } from '../../redux/selectors';
import {
  handlePieceClick,
  updateOptions,
} from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ActivePuzzleContext } from './ActivePuzzleContext';
import ImagePiece from './ImagePiece';

const PuzzleBoardWrapper = styled.div<{ width: number; height: number }>`
  width: ${(p) => `${p.width}px`};
  height: ${(p) => `${p.height}px`};

  > div {
    margin-right: 1px;
    margin-bottom: 1px;
  }
`;

const PuzzleBoard = () => {
  const dispatch = useAppDispatch();
  const [hasStarted, setHasStarted] = useState(false);
  const isFinished = useAppSelector(selectIsFinished);
  const { startTimer, stopTimer, elapsedSeconds } =
    useContext(ActivePuzzleContext);

  const {
    pieces,
    pieceWidth,
    pieceHeight,
    imageWidth,
    imageHeight,
    rows,
    columns,
    selectedPieceIndex,
    imageSrc,
  } = useAppSelector((state) => state.activePuzzle);

  const handleImagePieceClick = (index: number) => {
    if (!hasStarted) {
      setHasStarted(true);
      startTimer();
    }
    if (!isFinished) {
      dispatch(handlePieceClick(index));
    }
  };

  useEffect(() => {
    if (isFinished) {
      stopTimer();
      dispatch(updateOptions({ totalSecondsTakenToSolve: elapsedSeconds }));
    }
  }, [dispatch, elapsedSeconds, isFinished, stopTimer]);

  const pieceComponents = pieces.map(({ top, left }, index) => {
    return (
      <ImagePiece
        key={`${top}:${left}`}
        src={imageSrc}
        pieceHeight={pieceHeight}
        pieceWidth={pieceWidth}
        top={top}
        left={left}
        onClick={() => handleImagePieceClick(index)}
        isSelected={index === selectedPieceIndex}
        isSelectionEnabled={!isFinished}
      />
    );
  });

  // Account for 1px of space between pieces
  const wrapperHeight = imageHeight + rows;
  const wrapperWidth = imageWidth + columns;

  return (
    <PuzzleBoardWrapper height={wrapperHeight} width={wrapperWidth}>
      {pieceComponents}
    </PuzzleBoardWrapper>
  );
};

export default PuzzleBoard;
