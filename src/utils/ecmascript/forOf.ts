export function forOf<T>(iterable: Iterable<T>, fn: (val: T) => void) {
  for (let value of iterable) {
    fn(value)
  }
}
