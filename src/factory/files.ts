import type { Input } from ".";

export class Files {
  private readonly _files = new Map<string, string[]>();

  constructor(files: Input["files"]) {
    const { files: defaults, includes } = files,
    scopes = Object.keys(defaults) as (keyof typeof defaults)[];

    for (const scope of scopes)
      this._files.set(
        scope,
        [
          ...defaults[scope],
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
