import ElapsedTimeIcon from '@mui/icons-material/AccessTime';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

import { updateOptions } from '../../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const StyledIcon = styled(ElapsedTimeIcon)`
  cursor: pointer;
`;

const ElapsedTimeButton = () => {
  const dispatch = useAppDispatch();
  const { showElapsedTime } = useAppSelector((state) => state.activePuzzle);

  const color = showElapsedTime ? 'primary' : 'disabled';
  const tooltipText = `${showElapsedTime ? 'Hide' : 'Show'} elapsed time`;

  const handleClick = () => {
    dispatch(updateOptions({ showElapsedTime: !showElapsedTime }));
  };

  return (
    <Tooltip title={tooltipText} placement="top">
      <StyledIcon color={color} onClick={handleClick} />
    </Tooltip>
  );
};

export default ElapsedTimeButton;
