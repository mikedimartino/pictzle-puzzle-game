import ImageIcon from '@mui/icons-material/Image';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

import { optionUpdated } from '../../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const StyledIcon = styled(ImageIcon)`
  cursor: pointer;
`;

const ShowImageButton = () => {
  const dispatch = useAppDispatch();
  const { showImage } = useAppSelector((state) => state.activePuzzle);

  const color = showImage ? 'primary' : 'disabled';
  const tooltipText = `${showImage ? 'Hide' : 'Show'} original image`;

  const handleClick = () => {
    dispatch(optionUpdated({ showImage: !showImage }));
  };

  return (
    <Tooltip title={tooltipText} placement="top">
      <StyledIcon color={color} onClick={handleClick} />
    </Tooltip>
  );
};

export default ShowImageButton;
