import { useState } from 'react';

import {
  DEFAULT_CUSTOM_COLUMNS,
  DEFAULT_CUSTOM_ROWS,
  DEFAULT_DIFFICULTY,
  Difficulty,
} from '../../constants';
import Header from '../Header';
import NewPuzzleSteps from './NewPuzzleSteps';
import { SettingsContext, SettingsContextValue } from './SettingsContext';

const NewPuzzleSettings = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_DIFFICULTY);
  const [customRows, setCustomRows] = useState(DEFAULT_CUSTOM_ROWS);
  const [customColumns, setCustomColumns] = useState(DEFAULT_CUSTOM_COLUMNS);

  const contextValue: SettingsContextValue = {
    imageSrc,
    setImageSrc,
    rows,
    setRows,
    columns,
    setColumns,
    difficulty,
    setDifficulty,
    customRows,
    setCustomRows,
    customColumns,
    setCustomColumns,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      <Header />
      <main>
        <NewPuzzleSteps />
      </main>
    </SettingsContext.Provider>
  );
};

export default NewPuzzleSettings;
