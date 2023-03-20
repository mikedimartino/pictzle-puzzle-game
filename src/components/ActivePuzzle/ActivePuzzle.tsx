import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  selectIsValidPuzzle,
  selectUnsolvedPiecesCount,
} from '../../redux/selectors';
import { reset, shuffle } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import PuzzleBoard from './PuzzleBoard';

const ButtonBar = styled.div`
  margin-bottom: 20px;
`;

const OriginalImage = styled.img`
  margin-bottom: 20px;
`;

const OriginalImageCheckboxWrapper = styled.div`
  margin-top: 20px;
`;

const ActivePuzzle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const { selectedPieceIndex, imageSrc } = useAppSelector(
    (state) => state.activePuzzle
  );
  const isValidPuzzle = useAppSelector(selectIsValidPuzzle);
  const { isLoading } = useAppSelector((state) => state.activePuzzle);
  const unsolvedPiecesCount = useAppSelector(selectUnsolvedPiecesCount);

  useEffect(() => {
    if (!isLoading && !isValidPuzzle) {
      navigate('/');
    }
  }, [isLoading, isValidPuzzle, navigate]);

  return (
    <div>
      <h1>Puzzle Game</h1>
      <ButtonBar>
        <button onClick={() => dispatch(shuffle())}>Shuffle</button>
        &nbsp;
        <button onClick={() => dispatch(reset())}>Reset</button>
        &nbsp; Selected piece: {selectedPieceIndex}
        <hr />
        Remaining out of position pieces: {unsolvedPiecesCount}
        <hr />
      </ButtonBar>
      <PuzzleBoard />
      <OriginalImageCheckboxWrapper>
        <input
          type="checkbox"
          checked={showImage}
          onChange={() => setShowImage((val) => !val)}
          id="toggle-show-image"
        />
        <label htmlFor="toggle-show-image">Show original image</label>
      </OriginalImageCheckboxWrapper>
      {showImage && <OriginalImage src={imageSrc} />}
    </div>
  );
};

export default ActivePuzzle;
