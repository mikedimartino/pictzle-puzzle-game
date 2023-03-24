import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styled from 'styled-components';

import { updateOptions } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const Container = styled(Paper)<{ top: number; left: number }>(
  ({ top, left }) => ({
    padding: '5px',
    width: 'fit-content',
    position: 'absolute',
    top,
    left,
  })
);

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
`;

const DragHandle = styled.div`
  flex-grow: 1;
  cursor: move;
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

type Position = { top: number; left: number };

const ImageModal = () => {
  const dispatch = useAppDispatch();

  const { imageSrc, showImageModal, imageModalLeft, imageModalTop } =
    useAppSelector((state) => state.activePuzzle);

  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const modalPositionRef = useRef<Position>({
    left: imageModalLeft,
    top: imageModalTop,
  });

  useEffect(() => {
    setInitialPosition({ ...modalPositionRef.current });
  }, [showImageModal]);

  const handleClose = () => {
    dispatch(
      updateOptions({
        showImageModal: false,
      })
    );
  };

  const handleDragStop = (_: DraggableEvent, { x, y }: DraggableData) => {
    // All of the drag calculations are based off of the initial position on the first render
    const newLeft = (initialPosition?.left || 0) + x;
    const newTop = (initialPosition?.top || 0) + y;

    dispatch(
      updateOptions({
        imageModalLeft: newLeft,
        imageModalTop: newTop,
      })
    );

    modalPositionRef.current.left = newLeft;
    modalPositionRef.current.top = newTop;
  };

  return showImageModal ? (
    <Draggable handle="#drag-handle" onStop={handleDragStop}>
      <Container
        top={initialPosition?.top || 0}
        left={initialPosition?.left || 0}
      >
        <TopBar>
          <DragHandle id="drag-handle">
            <DragIndicatorIcon />
          </DragHandle>
          <StyledCloseIcon onClick={handleClose} />
        </TopBar>
        <img src={imageSrc} />
      </Container>
    </Draggable>
  ) : null;
};

export default ImageModal;
