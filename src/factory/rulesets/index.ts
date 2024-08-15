import Ruleset, { Rule } from "./ruleset/index.js";
import type { Input } from "../../boundary/index.js";
import type { Scope } from "../../scopes/index.js";

export default class {
  constructor(private readonly input: Input.Rules.Rules) {}

  public ruleset<S extends Scope>(scope: literalful<S>): Ruleset<S> {
    try {
      const { preset, overrides } = this.input;

      return new Ruleset<S>(scope, ...preset[scope].map(args => new Rule(...args))).override(overrides[scope]);
    }
    catch (e) { throw new Error(`linted.factory.Rulesets/ruleset/scope:${scope}`, { cause: e }); }
  }
}
