import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  selectIsValidPuzzle,
  selectUnsolvedPiecesCount,
} from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import PuzzleBoard from './PuzzleBoard';

const OriginalImage = styled.img`
  margin-bottom: 20px;
`;

const OriginalImageCheckboxWrapper = styled.div`
  margin-top: 20px;
`;

const ActivePuzzle = () => {
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const { imageSrc } = useAppSelector((state) => state.activePuzzle);
  const isValidPuzzle = useAppSelector(selectIsValidPuzzle);
  const unsolvedPiecesCount = useAppSelector(selectUnsolvedPiecesCount);

  useEffect(() => {
    if (!isValidPuzzle) {
      navigate('/');
    }
  }, [isValidPuzzle, navigate]);

  return (
    <div>
      <p>Remaining out of position pieces: {unsolvedPiecesCount}</p>
      <hr />
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
