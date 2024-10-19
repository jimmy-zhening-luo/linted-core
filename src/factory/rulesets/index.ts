import type { Input } from "..";

export type { Input };

import { Ruleset } from "./ruleset";

export class Rulesets {
  private readonly rulesets = new Map<string, Ruleset>();

  constructor(private readonly input: Input["rules"]) {
    const { rules, overrides } = this.input,
    scopes = Object.keys(rules) as (keyof typeof rules)[];

    for (const scope of scopes)
      this.rulesets.set(scope, new Ruleset(scope, rules[scope], overrides[scope]));
  }

  public ruleset(scope: string): Ruleset {
    if (!this.rulesets.has(scope))
      throw new ReferenceError(`Ruleset not found for scope: ${scope}`);

    return this.rulesets.get(scope) as Ruleset;
  }
}
