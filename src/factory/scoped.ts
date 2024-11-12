import type { Input, Scopes } from "..";
import { Ruleset } from "./ruleset";

export class ScopeFactory {
  constructor(
    public readonly defaultScopes: Pick<Input["defaults"], "files" | "ignores" | "rules">,
    public readonly extensions: Omit<Input["extensions"], "*">,
  ) {}

  public produce(scope: Scopes) {
    return [
      [...this.defaultScopes.files[scope], ...this.extensions[scope]?.files ?? []] as string[],
      [...this.defaultScopes.ignores[scope], ...this.extensions[scope]?.ignores ?? []] as string[],
      new Ruleset(scope, this.defaultScopes.rules[scope], this.extensions[scope]?.rules),
    ] as const;
  }
}
