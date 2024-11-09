import type {
  RuleEntry,
  RuleRecord,
} from ".";

export class Ruleset {
  public readonly ruleset: { id: string; rules: RuleRecord }[];

  constructor(
    public readonly scope: string,
    rules: RuleEntry[],
    override?: RuleRecord,
  ) {
    const map = ([id, rules]: RuleEntry) => {
      return {
        id: `${scope}:${id}`,
        rules,
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
