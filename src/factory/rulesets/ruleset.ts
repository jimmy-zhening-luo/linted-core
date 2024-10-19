import type { Input } from ".";

export class Ruleset {
  public readonly ruleset: { id: string; rule: Input.Rule.Entry.Record }[];

  constructor(
    public readonly scope: string,
    rules: (readonly [string, Input.Rule.Entry.Record])[],
    override?: Input.Rule.Entry.Record,
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
