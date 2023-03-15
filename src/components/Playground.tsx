import { useState } from 'react';
import styled from 'styled-components';

import divideImage from '../utils/divideImage';
import ImagePiece from './ImagePiece';

const IMG_SRC = 'https://sentientmedia.org/wp-content/uploads/2021/03/sebastian-pena-lambarri-poly_hmhwJs-unsplash.jpg';

const ImageSectionsWrapper = styled.div<{ width: number, height: number }>`
  margin-top: 50px;
  width: ${p => `${p.width}px`};
  height: ${p => `${p.height}px`};

  > div {
    margin-right: 1px;
    margin-bottom: 1px;
  }
`;

const Playground = () => {
  const numRows = 3;
  const numColumns = 3;
  const { image, pieceHeight, pieceWidth, topLeftCoordinates } = divideImage(IMG_SRC, numRows, numColumns);

  // Account for 1px of space between pieces
  const imageContainerWidth = image.width + numColumns; // - 1; 
  const imageContainerHeight = image.height + numRows; // - 1;

  const [imagePieceCoordinates, setImagePieceCoordinates] = useState(topLeftCoordinates);
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);

  const shuffleImage = () => {
    setImagePieceCoordinates([...imagePieceCoordinates.sort(() => Math.random() - 0.5)]);
    unselectPiece();
  };

  const resetImage = () => {
    setImagePieceCoordinates(topLeftCoordinates);
    unselectPiece();
  };

  const unselectPiece = () => setSelectedPieceIndex(null);

  const handlePieceClick = (index: number) => {
    if (index === selectedPieceIndex) {
      unselectPiece();
    } else if (selectedPieceIndex === null) {
      setSelectedPieceIndex(index);
    } else {
      // Swap
      const temp = imagePieceCoordinates[index];
      imagePieceCoordinates[index] = imagePieceCoordinates[selectedPieceIndex];
      imagePieceCoordinates[selectedPieceIndex] = temp;
      setImagePieceCoordinates([...imagePieceCoordinates]);
      unselectPiece();
    }
  };

  const imagePieces = imagePieceCoordinates.map(({ top, left }, index) => {
    return (
      <ImagePiece
        key={`${top}:${left}`}
        src={IMG_SRC}
        pieceHeight={pieceHeight}
        pieceWidth={pieceWidth}
        top={top}
        left={left}
        onClick={() => handlePieceClick(index)}
      />
    )
  });

  return (
    <div>
      <h1>Puzzle Game</h1>
      <div>
        <button onClick={shuffleImage}>Shuffle</button>
        &nbsp;
        <button onClick={resetImage}>Reset</button>
        &nbsp;
        Selected piece: {selectedPieceIndex}
      </div>
      <ImageSectionsWrapper width={imageContainerWidth} height={imageContainerHeight}>
        {imagePieces}
      </ImageSectionsWrapper>
    </div>
  );
};

export default Playground;