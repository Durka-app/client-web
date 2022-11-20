export class Bitfield {
  private _bitfield: number;

  public constructor(bitfield: CanBeArray<Bitfield | number>) {
    this._bitfield = normalizeBitfield(bitfield);
  }

  public any(bitfield: number): boolean {
    return (this._bitfield & bitfield) !== 0;
  }

  public all(bitfield: CanBeArray<Bitfield | number>): boolean {
    return (this._bitfield & normalizeBitfield(bitfield)) === bitfield;
  }

  public none(bitfield: number): boolean {
    return (this._bitfield & bitfield) === 0;
  }

  public add(bitfield: CanBeArray<Bitfield | number>) {
    this._bitfield |= normalizeBitfield(bitfield);
  }

  public remove(bitfield: CanBeArray<Bitfield | number>) {
    this._bitfield &= ~normalizeBitfield(bitfield);
  }

  public clear() {
    this._bitfield = 0;
  }

  public valueOf(): number {
    return this._bitfield;
  }
}

function normalizeBitfield(bitfield: CanBeArray<Bitfield | number>): number {
  if(bitfield instanceof Bitfield || typeof bitfield === 'number') return bitfield.valueOf();

  let normalized = 0;
  for(const item of bitfield) {
    normalized |= item.valueOf();
  }
  return normalized;
}
