export function raise(block: () => Error): () => never {
  return () => {
    throw block();
  };
}

export function unreachable(): () => never {
  return () => {
    throw new Error('Unreachable');
  };
}
