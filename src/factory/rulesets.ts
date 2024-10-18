import type { Input } from "@eslinted/core/input";
import type { Scope } from "@eslinted/core/scopes";
import { Ruleset, Rule } from "./ruleset";

export class Rulesets {
  constructor(private readonly input: Input["rules"]) {}

  public ruleset<S extends Scope>(scope: literalful<S>): Ruleset<S> {
    try {
      const { rules, overrides } = this.input;

      return new Ruleset<S>(scope, ...rules[scope].map(args => new Rule(...args))).override(overrides[scope]);
    }
    catch (e) { throw new Error(`linted.factory.Rulesets/ruleset/scope:${scope}`, { cause: e }); }
  }
}
