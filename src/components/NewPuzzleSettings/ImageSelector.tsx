import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useContext } from 'react';
import styled from 'styled-components';

import puzzleImages from '../../puzzleImages';
import { SettingsContext } from './SettingsContext';

const StyledImage = styled.img<{ isSelected: boolean }>`
  max-width: 200px;
  border: ${(p) => (p.isSelected ? '3px solid orange' : '')};
  cursor: pointer;
`;

const ImageSelectorWrapper = styled.section`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ImageSelector = () => {
  const { imageSrc: selectedImageSrc, setImageSrc } =
    useContext(SettingsContext);

  const handleImageClick = (imageSrc: string) => {
    setImageSrc(imageSrc);
  };

  return (
    <ImageSelectorWrapper>
      <ImageList cols={3} gap={5}>
        {puzzleImages.map((imageSrc) => (
          <ImageListItem key={imageSrc}>
            <StyledImage
              src={imageSrc}
              isSelected={imageSrc === selectedImageSrc}
              onClick={() => handleImageClick(imageSrc)}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </ImageSelectorWrapper>
  );
};

export default ImageSelector;
