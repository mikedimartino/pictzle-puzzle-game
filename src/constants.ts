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

// Starting position of the original image modal:
export const DEFAULT_ORIGINAL_IMAGE_TOP = 110;
export const DEFAULT_ORIGINAL_IMAGE_LEFT = 25;
