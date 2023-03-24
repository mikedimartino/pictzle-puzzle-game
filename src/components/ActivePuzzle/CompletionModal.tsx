import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { selectIsFinished } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import formatSeconds from '../../utils/formatSeconds';

const DELAY = 1000;

const ContentWrapper = styled(Paper)`
  padding: 25px 40px;
`;

const CompletionModal = () => {
  const [hasClosed, setHasClosed] = useState(false);
  const [isReadyToOpen, setIsReadyToOpen] = useState(false);
  const isFinished = useAppSelector(selectIsFinished);
  const { totalSecondsTakenToSolve, totalMoves } = useAppSelector(
    (state) => state.activePuzzle
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isFinished) {
        setIsReadyToOpen(true);
      }
    }, DELAY);

    return () => clearTimeout(timeout);
  }, [isFinished]);

  return (
    <Dialog
      open={isReadyToOpen && !hasClosed}
      onClose={() => setHasClosed(true)}
    >
      <ContentWrapper>
        <Typography variant="h6">Puzzle Solved!</Typography>
        <Typography variant="body1">
          Time taken: {formatSeconds(totalSecondsTakenToSolve)}
        </Typography>
        <Typography variant="body1">Total moves: {totalMoves}</Typography>
      </ContentWrapper>
    </Dialog>
  );
};

export default CompletionModal;
