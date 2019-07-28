type TypedBucket<T> = {
  key: string
  values: T[]
}

export function bucketizer<T>(
  values: T[],
  preSortValues: (a: T, b: T) => -1 | 0 | 1,
  getBucketKey: (value: T) => string,
): TypedBucket<T>[] {
  const mapped = {}

  const sorted = values.sort(preSortValues)
  sorted.forEach(value => {
    const key = getBucketKey(value)
    if (!(key in mapped)) {
      mapped[key] = []
    }
    mapped[key].push(value)
  })

  return Object.keys(mapped).reduce(
    (accum, key): TypedBucket<T>[] =>
      accum.concat({
        key,
        values: mapped[key],
      }),
    [] as TypedBucket<T>[],
  )
}
