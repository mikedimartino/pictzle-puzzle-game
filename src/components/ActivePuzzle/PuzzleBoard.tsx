import styled from 'styled-components';

import { handlePieceClick } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
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

  const pieceComponents = pieces.map(({ top, left }, index) => {
    return (
      <ImagePiece
        key={`${top}:${left}`}
        src={imageSrc}
        pieceHeight={pieceHeight}
        pieceWidth={pieceWidth}
        top={top}
        left={left}
        onClick={() => dispatch(handlePieceClick(index))}
        isSelected={index === selectedPieceIndex}
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
