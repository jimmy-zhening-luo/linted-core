import type { Scope } from "../../scopes/index.js";
import type { Input } from "../../boundary/index.js";

export default class Files {
  constructor(private readonly input: Input.Files.Files) {}

  public files(scope: Scope): readonly string[] {
    try {
      const { base, includes } = this.input;

      return [...base[scope], ...includes[scope] ?? []];
    }
    catch (e) { throw new Error(`linted.factory.Files/scope:${scope}`, { cause: e }); }
  }
}
