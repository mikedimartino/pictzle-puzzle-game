import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Paper from '@mui/material/Paper';
import { Resizable, ResizeDirection } from 're-resizable';
import { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styled from 'styled-components';

import { updateOptions } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const StyledResizable = styled(Resizable)<{ top: number; left: number }>(
  ({ top, left }) => ({
    position: 'absolute !important' as any,
    top,
    left,
    width: 'fit-content',
  })
);

const StyledPaper = styled(Paper)`
  padding: 5px;
  width: fit-content;
`;

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

  const {
    imageSrc,
    showImageModal,
    imageModalLeft,
    imageModalTop,
    imageWidth: originalImageWidth,
  } = useAppSelector((state) => state.activePuzzle);

  const [imageWidth, setImageWidth] = useState(originalImageWidth);
  const [imageWidthAfterResize, setImageWidthAfterResize] =
    useState(originalImageWidth);

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

  const handleResizeStop = () => {
    setImageWidthAfterResize(imageWidth);
  };

  const handleResize = (
    _0: MouseEvent | TouchEvent,
    _1: ResizeDirection,
    _2: HTMLElement,
    delta: { width: number; height: number }
  ) => {
    setImageWidth(imageWidthAfterResize + delta.width);
  };

  return showImageModal ? (
    <Draggable handle="#drag-handle" onStop={handleDragStop}>
      <StyledResizable
        top={initialPosition?.top || 0}
        left={initialPosition?.left || 0}
        size={{ width: 'fit-content', height: 'auto' }}
        lockAspectRatio
        onResizeStop={handleResizeStop}
        onResize={handleResize}
        minWidth="200px"
        maxWidth={originalImageWidth + 200}
      >
        <StyledPaper>
          <TopBar>
            <DragHandle id="drag-handle">
              <DragIndicatorIcon />
            </DragHandle>
            <StyledCloseIcon onClick={handleClose} />
          </TopBar>
          <img src={imageSrc} width={imageWidth} />
        </StyledPaper>
      </StyledResizable>
    </Draggable>
  ) : null;
};

export default ImageModal;
