import type { Scope } from "../../../scopes/index.js";
import Rule from "./rule/index.js";

export { Rule };
export default class Ruleset<S extends Scope> {
  public readonly ruleset: readonly Rule[];
  public overrides: Null<Rule> = null;

  constructor(private readonly scope: literalful<S>, ...rules: readonly Rule[]) {
    try {
      this.ruleset = [...rules];
    }
    catch (e) { throw new Error(`linted.factory.Ruleset`, { cause: e }); }
  }

  public get id() {
    const { scope } = this;

    return scope;
  }

  public get records() {
    try {
      const { ruleset, overrides } = this;

      return [
        ...ruleset.map(rules => [rules.id, rules.rules] as const),
        ...overrides === null ? [] : [[overrides.id, overrides.rules] as const] as const,
      ];
    }
    catch (e) { throw new Error(`linted.factory.Ruleset: records`, { cause: e }); }
  }

  public override(overrides: undefined | Rule["rules"]) {
    if (typeof overrides !== "undefined")
      this.overrides = new Rule("override", overrides);

    return this;
  }
}
