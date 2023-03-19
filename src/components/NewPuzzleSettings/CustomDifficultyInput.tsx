import { useState } from 'react';

const MIN = 1;
const MAX = 10;

export type CustomDifficultyInputProps = {
  initialValue: number;
  onChange: (value: number) => void;
}

const CustomDifficultyInput = ({ initialValue, onChange }: CustomDifficultyInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault(); // Only allow changing via the arrows (for now)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).valueAsNumber as number;
    setValue(value);
    onChange(value);
    event.stopPropagation();
  };

  return (
    <div>
      <input
        type="number"
        min={MIN}
        max={MAX}
        pattern="\d*"
        onKeyDown={(event) => handleKeyDown(event)}
        onChange={(event) => handleChange(event)}
        value={value}
      />
    </div>
    
  )
};

export default CustomDifficultyInput;