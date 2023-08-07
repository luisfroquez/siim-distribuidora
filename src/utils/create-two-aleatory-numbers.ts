export function createTwoAleatoryNumbers(
  max: number,
  diff: number
): [number, number] {
  const numero1 = Math.floor(Math.random() * (max - diff + 1))
  const numero2 = numero1 + diff
  return [numero1, numero2]
}
