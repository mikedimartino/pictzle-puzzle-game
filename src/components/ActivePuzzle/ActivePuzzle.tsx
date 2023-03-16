import styled from 'styled-components';

import { reset, shuffle } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import PuzzleBoard from './PuzzleBoard';

const ButtonBar = styled.div`
  margin-bottom: 20px;
`;

const ActivePuzzle = () => {
  const dispatch = useAppDispatch();
  const { selectedPieceIndex } = useAppSelector(state => state.activePuzzle);

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
    </div>
  );
};

export default ActivePuzzle;