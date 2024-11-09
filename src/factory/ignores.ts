import type { Input } from ".";

export class Ignores {
  private readonly _ignores = new Map<string, string[]>();

  constructor(ignores: Input["ignores"]) {
    const { ignores: defaults, extend } = ignores,
    scopes = Object.keys(defaults) as (keyof typeof defaults)[];

    for (const scope of scopes)
      this._ignores.set(
        scope,
        [
          ...defaults[scope],
          ...scope in extend ? (extend[scope] as string[]) : [],
        ],
      );
  }

  public ignores(scope: string) {
    if (!this._ignores.has(scope))
      throw new ReferenceError(`Files not found for scope: ${scope}`);

    return this._ignores.get(scope) as string[];
  }
}
