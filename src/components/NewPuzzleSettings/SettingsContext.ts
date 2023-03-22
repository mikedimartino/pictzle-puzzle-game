import { createContext } from 'react';

import { NOOP } from '../../constants';

export type SettingsContextValue = {
  imageSrc: string;
  setImageSrc: (value: string) => void;
  rows: number;
  setRows: (value: number) => void;
  columns: number;
  setColumns: (value: number) => void;
};

const defaultSettings: SettingsContextValue = {
  imageSrc: '',
  setImageSrc: NOOP,
  rows: 0,
  setRows: NOOP,
  columns: 0,
  setColumns: NOOP,
};

export const SettingsContext = createContext(defaultSettings);
