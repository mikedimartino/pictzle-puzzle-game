import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { NOOP } from '../../constants';
import { updateDifficulty } from '../../redux/slices/activePuzzleSlice';
import { useAppDispatch } from '../../redux/store';
import CustomDifficultyInput from './CustomDifficultyInput';

const DEFAULT_CUSTOM_ROWS = 5;
const DEFAULT_CUSTOM_COLUMNS = 5;

enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Custom = 'Custom',
}

const DEFAULT_DIFFICULTY = Difficulty.Medium;

const DIFFICULTY_RC = {
  [Difficulty.Easy]: { rows: 3, columns: 3 },
  [Difficulty.Medium]: { rows: 6, columns: 6 },
  [Difficulty.Hard]: { rows: 10, columns: 10 },
};

const RadioButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  > label: {
    display: inline;
  }
`;

const CustomDifficultyWrapper = styled.div`
  display: inline-flex;
`;

const RADIO_INPUT_DEFAULT_PROPS = {
  type: 'radio',
  name: 'difficulty',
  onChange: NOOP,
};

const DifficultySelector = () => {
  const dispatch = useAppDispatch();
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
  const [customRows, setCustomRows] = useState(DEFAULT_CUSTOM_ROWS);
  const [customColumns, setCustomColumns] = useState(DEFAULT_CUSTOM_COLUMNS);

  useEffect(() => {
    const rows = difficulty === Difficulty.Custom ? customRows : DIFFICULTY_RC[difficulty].rows;
    const columns = difficulty === Difficulty.Custom ? customColumns : DIFFICULTY_RC[difficulty].columns;
    dispatch(updateDifficulty({ rows, columns }));
  }, [customRows, customColumns, difficulty, dispatch]);

  const handleDifficultyChange = (event: React.FormEvent<HTMLDivElement>) => {
    const value = (event.target as HTMLInputElement).value as Difficulty;
    setDifficulty(value);
  };

  const handleCustomRowsChange = (value: number) => {
    setDifficulty(Difficulty.Custom);
    setCustomRows(value);
  };

  const handleCustomColumnsChange = (value: number) => {
    setDifficulty(Difficulty.Custom);
    setCustomColumns(value);
  };

  return (
    <section>
      <h2>Pick the difficulty level (rows &times; columns):</h2>
      <RadioButtonsWrapper onChange={handleDifficultyChange}>
        <label style={{ display: 'inline' }}>
          <input
            {...RADIO_INPUT_DEFAULT_PROPS}
            value={Difficulty.Easy}
            checked={difficulty === Difficulty.Easy}
          />
          Easy ({DIFFICULTY_RC[Difficulty.Easy].rows} &times; {DIFFICULTY_RC[Difficulty.Easy].columns})
        </label>
        <label>
          <input
            {...RADIO_INPUT_DEFAULT_PROPS}
            value={Difficulty.Medium}
            checked={difficulty === Difficulty.Medium}
          />
          Medium ({DIFFICULTY_RC[Difficulty.Medium].rows} &times; {DIFFICULTY_RC[Difficulty.Medium].columns})
        </label>
        <label>
          <input
            {...RADIO_INPUT_DEFAULT_PROPS}
            value={Difficulty.Hard}
            checked={difficulty === Difficulty.Hard}
          />
          Hard ({DIFFICULTY_RC[Difficulty.Hard].rows} &times; {DIFFICULTY_RC[Difficulty.Hard].columns})
        </label>
        <label>
          <input
            {...RADIO_INPUT_DEFAULT_PROPS}
            value={Difficulty.Custom}
            checked={difficulty === Difficulty.Custom}
          />
          <CustomDifficultyWrapper>
            Custom:&nbsp;
            <CustomDifficultyInput initialValue={DEFAULT_CUSTOM_ROWS} onChange={handleCustomRowsChange} />
            &nbsp;&times;&nbsp;
            <CustomDifficultyInput initialValue={DEFAULT_CUSTOM_COLUMNS} onChange={handleCustomColumnsChange} />
          </CustomDifficultyWrapper>
        </label>
      </RadioButtonsWrapper>
    </section>
  )
};

export default DifficultySelector;