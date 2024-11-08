import type {
  RuleEntry,
  RuleRecord,
} from ".";

export class Ruleset {
  public readonly ruleset: { id: string; rule: RuleRecord }[];

  constructor(
    public readonly scope: string,
    rules: RuleEntry[],
    override?: RuleRecord,
  ) {
    const map = ([id, rule]: typeof rules[number]) => {
      return {
        id: `${scope}:${id}`,
        rule,
      };
    };

    this.ruleset = [
      ...rules.map(rule => map(rule)),
      ...typeof override === "undefined"
        ? []
        : [map([`${scope}:override`, override])],
    ];
  }
}
