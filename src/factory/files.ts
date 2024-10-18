import type { Scope, Input } from ".";

export class Files {
  constructor(private readonly input: Input["files"]) {}

  public files(scope: Scope): readonly string[] {
    try {
      const { files, includes } = this.input;

      return [...files[scope], ...includes[scope] ?? []];
    }
    catch (e) { throw new Error(`linted.factory.Files/scope:${scope}`, { cause: e }); }
  }
}
