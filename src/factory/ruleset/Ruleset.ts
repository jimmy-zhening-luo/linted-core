import type { Scope } from "../../scopes/scopes.js";
import Rule from "./rule/Rule.js";

export { Rule };
export default class Ruleset<S extends Scope> {
  public readonly ruleset: readonly Rule[];
  public overrides: Null<Rule> = null;

  constructor(
    private readonly scope: literalful<S>,
    ...ruleset: readonly Rule[]
  ) {
    this.ruleset = [...ruleset];
  }

  public get id() {
    const { scope } = this;

    return scope;
  }

  public get records() {
    const { ruleset, overrides } = this;

    return [
      ...ruleset.map(rules => [rules.id, rules.rules] as const),
      ...overrides === null ? [] : [[overrides.id, overrides.rules] as const] as const,
    ];
  }

  public override(overrides: undefined | IRule) {
    if (typeof overrides !== "undefined")
      this.overrides = new Rule(
        "override",
        overrides,
      );

    return this;
  }
}
