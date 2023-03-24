import ExtensionIcon from '@mui/icons-material/Extension';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

import { updateOptions } from '../../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const StyledIcon = styled(ExtensionIcon)`
  cursor: pointer;
`;

const UnsolvedPiecesButton = () => {
  const dispatch = useAppDispatch();
  const { showUnsolvedPiecesCount } = useAppSelector(
    (state) => state.activePuzzle
  );

  const color = showUnsolvedPiecesCount ? 'primary' : 'disabled';
  const tooltipText = `${
    showUnsolvedPiecesCount ? 'Hide' : 'Show'
  } unsolved pieces count`;

  const handleClick = () => {
    dispatch(
      updateOptions({ showUnsolvedPiecesCount: !showUnsolvedPiecesCount })
    );
  };

  return (
    <Tooltip title={tooltipText} placement="top">
      <StyledIcon color={color} onClick={handleClick} />
    </Tooltip>
  );
};

export default UnsolvedPiecesButton;
