type TypedBucket<T> = {
  key: string
  values: T[]
}

export function bucketizer<T>(
  values: T[],
  sortValues: (a: T, b: T) => -1 | 0 | 1,
  getBucketKey: (value: T) => string,
) {
  const mapped = {}

  const sorted = values.sort(sortValues)
  sorted.forEach(value => {
    const key = getBucketKey(value)
    if (!(key in mapped)) {
      mapped[key] = []
    }
    mapped[key].push(value)
  })

  return Object.keys(mapped)
    .reduce(
      (accum, key): TypedBucket<T>[] =>
        accum.concat({
          key,
          values: mapped[key],
        }),
      [] as TypedBucket<T>[],
    )
    .sort((a, b) => (a.key > b.key ? 1 : -1))
}
