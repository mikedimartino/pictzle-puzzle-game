import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { selectIsValidPuzzle } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import Footer from './Footer';
import PuzzleBoard from './PuzzleBoard';
import TopBar from './TopBar';

const StyledPaper = styled(Paper)`
  width: fit-content;
  padding: 15px;
  padding-top: 0;
  margin: auto;
`;

const ActivePuzzle = () => {
  const navigate = useNavigate();
  const isValidPuzzle = useAppSelector(selectIsValidPuzzle);

  useEffect(() => {
    if (!isValidPuzzle) {
      navigate('/');
    }
  }, [isValidPuzzle, navigate]);

  return (
    <main>
      <StyledPaper>
        <TopBar />
        <PuzzleBoard />
        <Footer />
      </StyledPaper>
    </main>
  );
};

export default ActivePuzzle;
