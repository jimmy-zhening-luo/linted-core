export type {
  RuleEntry,
  RuleRecord,
} from "..";

import type { Input } from "..";
import { Ruleset } from "./ruleset";

export class Rules {
  private readonly rulesets = new Map<string, Ruleset>();

  constructor(rules: Input["rules"]) {
    const { rules: base, overrides } = rules,
    scopes = Object.keys(base) as (keyof typeof base)[];

    for (const scope of scopes)
      this.rulesets.set(scope, new Ruleset(scope, base[scope], overrides[scope]));
  }

  public rules(scope: string): Ruleset {
    if (!this.rulesets.has(scope))
      throw new ReferenceError(`Ruleset not found for scope: ${scope}`);

    return this.rulesets.get(scope) as Ruleset;
  }
}
