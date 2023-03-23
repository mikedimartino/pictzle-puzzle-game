import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import styled from 'styled-components';

import { SettingsContext } from './SettingsContext';

const Wrapper = styled.div`
  padding: 20px 15px;
`;

const StyledImage = styled.img`
  max-width: 100%;
  margin-bottom: 30px;
`;

const SettingsConfirmation = () => {
  const { imageSrc, rows, columns } = useContext(SettingsContext);

  return (
    <Wrapper>
      <Typography variant="h6">Image:</Typography>
      <StyledImage src={imageSrc} />
      <Typography variant="h6">Difficulty:</Typography>
      <Typography variant="body1">
        {rows} rows x {columns} columns ({rows * columns} total pieces)
      </Typography>
    </Wrapper>
  );
};

export default SettingsConfirmation;
