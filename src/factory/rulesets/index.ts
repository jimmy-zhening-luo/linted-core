import type { Input } from "..";

export type { Input };

import { Ruleset } from "./ruleset";

export class Rulesets {
  private readonly rulesets = new Map<string, Ruleset>();

  constructor(rules: Input["rules"]) {
    const { rules: base, overrides } = rules,
    scopes = Object.keys(base) as (keyof typeof base)[];

    for (const scope of scopes)
      this.rulesets.set(scope, new Ruleset(scope, base[scope], overrides[scope]));
  }

  public ruleset(scope: string): Ruleset {
    if (!this.rulesets.has(scope))
      throw new ReferenceError(`Ruleset not found for scope: ${scope}`);

    return this.rulesets.get(scope) as Ruleset;
  }
}
