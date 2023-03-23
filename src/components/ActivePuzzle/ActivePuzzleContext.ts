import { createContext } from 'react';

import { NOOP } from '../../constants';

export type ActivePuzzleContextValue = {
  elapsedSeconds: number;
  startTimer: () => void;
  stopTimer: () => void;
};

const defaultValue: ActivePuzzleContextValue = {
  elapsedSeconds: 0,
  startTimer: NOOP,
  stopTimer: NOOP,
};

export const ActivePuzzleContext = createContext(defaultValue);
