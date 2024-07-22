import type { Scope } from "../index.js";

export default class Files<S extends Scope> {
  public readonly files: readonly string[];

  constructor(
    scope: S,
    filescopes: {
      base: Record<Scope, string[]>;
      includes: Particord<Scope, string[]>;
    },
  ) {
    const { base, includes } = filescopes;

    this.files = [
      ...base[scope],
      ...includes[scope] ?? [],
    ];
  }
}
