export const NOOP = () => undefined;

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Custom = 'Custom',
}

export const DEFAULT_DIFFICULTY = Difficulty.Easy;
export const DEFAULT_CUSTOM_ROWS = 5;
export const DEFAULT_CUSTOM_COLUMNS = 5;
