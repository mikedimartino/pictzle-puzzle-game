export default function randomize<T>(list: T[]) {
  return list.sort(() => Math.random() - 0.5);
}
