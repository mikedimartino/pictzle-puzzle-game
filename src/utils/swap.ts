export default function swap<T>(list: T[], index1: number, index2: number) {
  const temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}
