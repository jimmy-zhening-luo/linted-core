import type { Input } from ".";

export class Files {
  private readonly _files = new Map<string, string[]>();

  constructor(private readonly input: Input["files"]) {
    const { files, includes } = this.input,
    scopes = Object.keys(files) as (keyof typeof files)[];

    for (const scope of scopes)
      this._files.set(
        scope,
        [
          ...files[scope],
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
