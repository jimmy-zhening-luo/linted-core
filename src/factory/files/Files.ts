import type { Scope } from "../../scopes/scopes.js";

export default class Files {
  constructor(
    private readonly base: Record<Scope, string[]>,
    private readonly includes: Particord<Scope, string[]>,
  ) {}

  public files(scope: Scope): readonly string[] {
    try {
      return [
        ...this.base[scope],
        ...this.includes[scope] ?? [],
      ];
    }
    catch (e) {
      throw new Error(
        `linted.factory.Files/scope:${scope}`,
        { cause: e },
      );
    }
  }
}
