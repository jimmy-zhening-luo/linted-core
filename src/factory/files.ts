import type { Input } from ".";

export class Files {
  private readonly _files = new Map<string, string[]>();

  constructor(files: Input["files"]) {
    const { files: base, includes } = files,
    scopes = Object.keys(base) as (keyof typeof base)[];

    for (const scope of scopes)
      this._files.set(
        scope,
        [
          ...base[scope],
          ...scope in includes ? (includes[scope] as string[]) : [],
        ],
      );
  }

  public files(scope: string) {
    if (!this._files.has(scope))
      throw new ReferenceError(`Files not found for scope: ${scope}`);

    return this._files.get(scope) as string[];
  }
}
