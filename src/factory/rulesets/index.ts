import Ruleset, { Rule } from "./ruleset/index.js";
import type { Input } from "../../boundary/index.js";
import type { Scope } from "../../scopes/index.js";

export default class {
  constructor(
    private readonly preset: Input.Rules.Preset,
    private readonly overrides: Input.Rules.Overrides,
  ) {}

  public ruleset<S extends Scope>(scope: literalful<S>): Ruleset<S> {
    try {
      return new Ruleset<S>(scope, ...this.preset[scope].map(args => new Rule(...args)))
        .override(this.overrides[scope]);
    }
    catch (e) { throw new Error(`linted.factory.Rulesets/ruleset/scope:${scope}`, { cause: e }); }
  }
}
