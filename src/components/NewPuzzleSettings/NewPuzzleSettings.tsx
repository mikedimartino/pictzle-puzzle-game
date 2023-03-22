import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { load } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch } from '../../redux/store';
import DifficultySelector from './DifficultySelector';
import ImageSelector from './ImageSelector';
import { SettingsContext, SettingsContextValue } from './SettingsContext';

const NewPuzzleSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  const contextValue: SettingsContextValue = {
    imageSrc,
    setImageSrc,
    rows,
    setRows,
    columns,
    setColumns,
  };

  const handleStartPuzzle = () => {
    dispatch(load({ rows, columns, imageSrc }));
    navigate('/puzzle');
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      <div>
        <section>
          <ImageSelector />
        </section>
        <hr />
        <DifficultySelector />
        <hr />
        <Button onClick={handleStartPuzzle}>Start Puzzle</Button>
      </div>
    </SettingsContext.Provider>
  );
};

export default NewPuzzleSettings;
