import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { selectIsValidPuzzle } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import {
  ActivePuzzleContext,
  ActivePuzzleContextValue,
} from './ActivePuzzleContext';
import Footer from './Footer';
import useTimer from './hooks/useTimer';
import ImageModal from './ImageModal';
import PuzzleBoard from './PuzzleBoard';
import TopBar from './TopBar';

const StyledPaper = styled(Paper)`
  width: fit-content;
  padding: 15px;
  padding-top: 0;
  margin: auto;
  margin-top: 50px;
`;

const ActivePuzzle = () => {
  const navigate = useNavigate();
  const isValidPuzzle = useAppSelector(selectIsValidPuzzle);
  const { elapsedSeconds, startTimer, stopTimer } = useTimer();

  const contextValue: ActivePuzzleContextValue = {
    elapsedSeconds,
    startTimer,
    stopTimer,
  };

  useEffect(() => {
    if (!isValidPuzzle) {
      navigate('/');
    }
  }, [isValidPuzzle, navigate]);

  return (
    <ActivePuzzleContext.Provider value={contextValue}>
      <div>
        <StyledPaper>
          <TopBar />
          <PuzzleBoard />
          <Footer />
        </StyledPaper>
        <ImageModal />
      </div>
    </ActivePuzzleContext.Provider>
  );
};

export default ActivePuzzle;
