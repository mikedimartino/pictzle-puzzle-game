import styled from 'styled-components';

type ImagePieceProps = {
  src: string;
  pieceHeight: number;
  pieceWidth: number;
  top: number;
  left: number;
  isSelected: boolean;
};

const ImagePiece = styled.div<ImagePieceProps>`
  display: inline-block;
  margin: 0;
  vertical-align: top;
  height: ${p => `${p.pieceHeight}px`};
  width: ${p => `${p.pieceWidth}px`};
  background: url(${p => p.src});
  background-position: -${p => p.left}px -${p => p.top}px;
  opacity: ${p => p.isSelected ? 0.3 : 1}
`;

export default ImagePiece;