import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  selectIsValidPuzzle,
  selectUnsolvedPiecesCount,
} from '../../redux/selectors';
import { load, shuffle } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import PuzzleBoard from './PuzzleBoard';

const IMG_SRC =
  'https://sentientmedia.org/wp-content/uploads/2021/03/sebastian-pena-lambarri-poly_hmhwJs-unsplash.jpg';

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
  const [hasStarted, setHasStarted] = useState(false);
  const { imageSrc } = useAppSelector((state) => state.activePuzzle);
  const isValidPuzzle = useAppSelector(selectIsValidPuzzle);
  const { isLoading } = useAppSelector((state) => state.activePuzzle);
  const unsolvedPiecesCount = useAppSelector(selectUnsolvedPiecesCount);

  const handleStart = () => {
    dispatch(shuffle());
    setHasStarted(true);
  };

  useEffect(() => {
    if (!isLoading && !isValidPuzzle) {
      navigate('/');
    }
  }, [isLoading, isValidPuzzle, navigate]);

  useEffect(() => {
    const image = new Image();
    image.src = IMG_SRC;
    image.onload = () => {
      // Wait for image to be loaded before doing anything.
      // Fixes issue where image sometimes does not appear on first render.
      dispatch(load({ imageSrc: IMG_SRC }));
      dispatch(shuffle());
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Puzzle Game</h1>
      {!hasStarted && <button onClick={handleStart}>Start</button>}
      {hasStarted && (
        <p>Remaining out of position pieces: {unsolvedPiecesCount}</p>
      )}
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
