import ImageIcon from '@mui/icons-material/Image';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

import { updateOptions } from '../../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const StyledIcon = styled(ImageIcon)`
  cursor: pointer;
`;

const ShowImageButton = () => {
  const dispatch = useAppDispatch();
  const { showImageModal } = useAppSelector((state) => state.activePuzzle);

  const color = showImageModal ? 'primary' : 'disabled';
  const tooltipText = `${showImageModal ? 'Hide' : 'Show'} original image`;

  const handleClick = () => {
    dispatch(updateOptions({ showImageModal: !showImageModal }));
  };

  return (
    <Tooltip title={tooltipText} placement="top">
      <StyledIcon color={color} onClick={handleClick} />
    </Tooltip>
  );
};

export default ShowImageButton;
