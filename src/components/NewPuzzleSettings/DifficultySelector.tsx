import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Difficulty } from '../../constants';
import { useAppDispatch } from '../../redux/store';
import CustomDifficultyInput from './CustomDifficultyInput';
import { SettingsContext } from './SettingsContext';

const DIFFICULTY_SETTINGS = {
  [Difficulty.Easy]: { rows: 3, columns: 3 },
  [Difficulty.Medium]: { rows: 6, columns: 6 },
  [Difficulty.Hard]: { rows: 10, columns: 10 },
};

const FormWrapper = styled.div`
  padding: 20px 15px;
`;

const CustomDifficultyWrapper = styled.div`
  display: inline-flex;
`;

const DifficultySelector = () => {
  const dispatch = useAppDispatch();
  const {
    setRows,
    setColumns,
    difficulty,
    setDifficulty,
    customRows,
    setCustomRows,
    customColumns,
    setCustomColumns,
  } = useContext(SettingsContext);

  useEffect(() => {
    const rows =
      difficulty === Difficulty.Custom
        ? customRows
        : DIFFICULTY_SETTINGS[difficulty].rows;
    const columns =
      difficulty === Difficulty.Custom
        ? customColumns
        : DIFFICULTY_SETTINGS[difficulty].columns;

    setRows(rows);
    setColumns(columns);
  }, [customRows, customColumns, difficulty, dispatch, setRows, setColumns]);

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

  const customDifficultyInput = (
    <CustomDifficultyWrapper>
      Custom:&nbsp;
      <CustomDifficultyInput
        initialValue={customRows}
        onChange={handleCustomRowsChange}
      />
      &nbsp;x&nbsp;
      <CustomDifficultyInput
        initialValue={customColumns}
        onChange={handleCustomColumnsChange}
      />
    </CustomDifficultyWrapper>
  );

  const renderLabelByDifficulty = (difficulty: Difficulty) => {
    if (difficulty === Difficulty.Custom) {
      return customDifficultyInput;
    }
    const rows = DIFFICULTY_SETTINGS[difficulty].rows;
    const columns = DIFFICULTY_SETTINGS[difficulty].columns;
    return `${difficulty} (${rows} x ${columns})`;
  };

  return (
    <FormWrapper onChange={handleDifficultyChange}>
      <FormControl>
        <FormLabel id="difficulty-group-label">(Rows x Columns)</FormLabel>
        <RadioGroup
          aria-labelledby="difficulty-group-label"
          name="difficulty-group"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          {Object.keys(Difficulty).map((difficulty) => (
            <FormControlLabel
              key={difficulty}
              value={difficulty}
              control={<Radio />}
              label={renderLabelByDifficulty(difficulty as Difficulty)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FormWrapper>
  );
};

export default DifficultySelector;
