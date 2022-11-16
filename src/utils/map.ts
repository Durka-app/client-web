export function putOr<K extends string | number | symbol, V>(
  map: Record<K, V>,
  key: K,
  value: V,
  block: (value: V) => void
) {
  if(key in map) return block(map[key]);
  map[key] = value;
}

export function removeOr<K extends string | number | symbol, V>(
  map: Record<K, V>,
  key: K,
  block: (value: V) => void
) {
  if(key in map) return block(map[key]);
  delete map[key];
}

export function getOr<K extends string | number | symbol, V>(map: Record<K, V>, key: K, block: () => V): V {
  if(key in map) return map[key];
  return block();
}

export function getOrPut<K extends string | number | symbol, V>(map: Record<K, V>, key: K, block: () => V): V {
  if(key in map) return map[key];
  return map[key] = block();
}
