import { useEffect } from 'react';
import styled from 'styled-components';

import { handlePieceClick, load } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ImagePiece from './ImagePiece';

const IMG_SRC = 'https://sentientmedia.org/wp-content/uploads/2021/03/sebastian-pena-lambarri-poly_hmhwJs-unsplash.jpg';

const PuzzleBoardWrapper = styled.div<{ width: number, height: number }>`
  width: ${p => `${p.width}px`};
  height: ${p => `${p.height}px`};

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
  } = useAppSelector(state => state.activePuzzle);

  useEffect(() => {
    const image = new Image();
    image.src = IMG_SRC;
    image.onload = () => {
      // Wait for image to be loaded before doing anything.
      // Fixes issue where image sometimes does not appear on first render.
      dispatch(load({ imageSrc: IMG_SRC }));
    }
  }, [dispatch]);

  const pieceComponents = pieces.map(({ top, left }, index) => {
    return (
      <ImagePiece
        key={`${top}:${left}`}
        src={IMG_SRC}
        pieceHeight={pieceHeight}
        pieceWidth={pieceWidth}
        top={top}
        left={left}
        onClick={() => dispatch(handlePieceClick(index))}
        isSelected={index === selectedPieceIndex}
      />
    )
  });

  // Account for 1px of space between pieces
  const wrapperHeight = imageHeight + rows;
  const wrapperWidth = imageWidth + columns;

  return (
    <PuzzleBoardWrapper height={wrapperHeight} width={wrapperWidth}>
      {pieceComponents}
    </PuzzleBoardWrapper>
  );
}

export default PuzzleBoard;