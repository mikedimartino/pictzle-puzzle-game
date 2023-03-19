import { useState } from 'react';
import styled from 'styled-components';

import { reset, shuffle } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import PuzzleBoard from './PuzzleBoard';

const ButtonBar = styled.div`
  margin-bottom: 20px;
`;

const OriginalImage = styled.img`
  margin-bottom: 20px
`;

const OriginalImageCheckboxWrapper = styled.div`
  margin-top: 20px;
`;

const ActivePuzzle = () => {
  const dispatch = useAppDispatch();
  const { selectedPieceIndex, imageSrc } = useAppSelector(state => state.activePuzzle);
  const [showImage, setShowImage] = useState(false);

  return (
    <div>
      <h1>Puzzle Game</h1>
      <ButtonBar>
        <button onClick={() => dispatch(shuffle())}>Shuffle</button>
        &nbsp;
        <button onClick={() => dispatch(reset())}>Reset</button>
        &nbsp;
        Selected piece: {selectedPieceIndex}
      </ButtonBar>
      <PuzzleBoard />
      <OriginalImageCheckboxWrapper>
        <input
          type="checkbox"
          checked={showImage}
          onChange={() => setShowImage(val => !val)}
          id="toggle-show-image"
        />
        <label htmlFor="toggle-show-image">Show original image</label>
      </OriginalImageCheckboxWrapper>
      { showImage && <OriginalImage src={imageSrc} /> }
    </div>
  );
};

export default ActivePuzzle;