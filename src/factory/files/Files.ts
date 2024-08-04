import type { Scope } from "../../scopes/Scopes.js";
import type { Input } from "../../boundary/boundary.js";

export default class Files {
  constructor(
    private readonly base: Input.Files.Base,
    private readonly includes: Input.Files.Includes,
  ) {}

  public files(scope: Scope): readonly string[] {
    try {
      return [...this.base[scope], ...this.includes[scope] ?? []];
    }
    catch (e) { throw new Error(`linted.factory.Files/scope:${scope}`, { cause: e }); }
  }
}
