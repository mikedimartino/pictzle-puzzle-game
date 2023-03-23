import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import styled from 'styled-components';

import { selectUnsolvedPiecesCount } from '../../redux/selectors';
import { useAppSelector } from '../../redux/store';
import formatSeconds from '../../utils/formatSeconds';
import { ActivePuzzleContext } from './ActivePuzzleContext';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const LeftContent = styled.div`
  text-align: left;
`;

const RightContent = styled.div`
  text-align: right;
`;

const Footer = () => {
  const { showUnsolvedPiecesCount, showElapsedTime } = useAppSelector(
    (state) => state.activePuzzle
  );
  const unsolvedPiecesCount = useAppSelector(selectUnsolvedPiecesCount);
  const { elapsedSeconds } = useContext(ActivePuzzleContext);

  const unsolvedPiecesContent = showUnsolvedPiecesCount ? (
    <Typography variant="caption">
      Out of position pieces: {unsolvedPiecesCount}
    </Typography>
  ) : null;

  const elapsedTimeContent = showElapsedTime ? (
    <Typography variant="caption">{formatSeconds(elapsedSeconds)}</Typography>
  ) : null;

  const hasContent = showUnsolvedPiecesCount || showElapsedTime;

  return hasContent ? (
    <Wrapper>
      <LeftContent>{unsolvedPiecesContent}</LeftContent>
      <RightContent>{elapsedTimeContent}</RightContent>
    </Wrapper>
  ) : null;
};

export default Footer;
