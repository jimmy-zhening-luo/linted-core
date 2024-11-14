import type {
  Scopes,
  RuleEntry,
  RuleRecord,
} from "..";

export class Ruleset {
  public readonly ruleset: { id: `${Scopes}:${string}`; rules: RuleRecord }[];

  constructor(
    public readonly scope: Scopes,
    defaults: RuleEntry[],
    extension?: RuleRecord,
  ) {
    const map = ([id, rules]: RuleEntry) => ({
      id: `${scope}:${id}`,
      rules,
    } as const);

    this.ruleset = [
      ...defaults.map(rule => map(rule)),
      ...typeof extension === "undefined"
        ? [] as const
        : [map([`${scope}:override`, extension])] as const,
    ] as const;
  }
}
