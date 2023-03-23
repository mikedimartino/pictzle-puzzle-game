export default function formatSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const valuesByUnit = [minutes, remainingSeconds];
  if (hours) {
    valuesByUnit.unshift(hours);
  }

  return valuesByUnit
    .map((value) => value.toString().padStart(2, '0'))
    .join(':');
}
