import { useState } from 'react';

const MIN = 1;
const MAX = 10;

export type CustomDifficultyInputProps = {
  initialValue: number;
  onChange: (value: number) => void;
};

const CustomDifficultyInput = ({
  initialValue,
  onChange,
}: CustomDifficultyInputProps) => {
  const [value, setValue] = useState(initialValue);

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
        onChange={(event) => handleChange(event)}
        value={value}
      />
    </div>
  );
};

export default CustomDifficultyInput;
