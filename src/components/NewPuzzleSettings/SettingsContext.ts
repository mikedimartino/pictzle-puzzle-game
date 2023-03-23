import { createContext } from 'react';

import {
  DEFAULT_CUSTOM_COLUMNS,
  DEFAULT_CUSTOM_ROWS,
  DEFAULT_DIFFICULTY,
  Difficulty,
  NOOP,
} from '../../constants';

export type SettingsContextValue = {
  imageSrc: string;
  setImageSrc: (value: string) => void;
  rows: number;
  setRows: (value: number) => void;
  columns: number;
  setColumns: (value: number) => void;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  customRows: number;
  setCustomRows: (value: number) => void;
  customColumns: number;
  setCustomColumns: (value: number) => void;
};

const defaultSettings: SettingsContextValue = {
  imageSrc: '',
  setImageSrc: NOOP,
  rows: 0,
  setRows: NOOP,
  columns: 0,
  setColumns: NOOP,
  difficulty: DEFAULT_DIFFICULTY,
  setDifficulty: NOOP,
  customRows: DEFAULT_CUSTOM_ROWS,
  setCustomRows: NOOP,
  customColumns: DEFAULT_CUSTOM_COLUMNS,
  setCustomColumns: NOOP,
};

export const SettingsContext = createContext(defaultSettings);
