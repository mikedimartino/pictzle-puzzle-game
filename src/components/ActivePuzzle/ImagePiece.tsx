import styled from 'styled-components';

type ImagePieceProps = {
  src: string;
  pieceHeight: number;
  pieceWidth: number;
  top: number;
  left: number;
  isSelected: boolean;
  isSelectionEnabled: boolean;
};

const ImagePiece = styled.div<ImagePieceProps>((props) => ({
  display: 'inline-block',
  margin: 0,
  verticalAlign: 'top',
  height: `${props.pieceHeight}px`,
  width: `${props.pieceWidth}px`,
  background: `url(${props.src})`,
  backgroundPosition: `-${props.left}px -${props.top}px`,
  opacity: props.isSelected ? 0.3 : 1,
  cursor: props.isSelectionEnabled ? 'pointer' : 'default',
}));

export default ImagePiece;
