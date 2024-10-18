import type { Scope } from "@eslinted/core";
import type { Input } from "@eslinted/core";

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
