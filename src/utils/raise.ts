export function raise(block: () => Error): () => never {
  return () => {
    throw block();
  };
}
