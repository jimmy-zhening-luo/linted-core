import type { Scopes, Rule } from "..";

export class Ruleset {
  public readonly ruleset: { id: `${Scopes}:${string}`; rules: Rule.Config }[];

  constructor(
    public readonly scope: Scopes,
    defaults: readonly Rule.Entry[],
    override?: Rule.Config,
  ) {
    const map = ([id, rules]: Rule.Entry) => ({
      id: `${scope}:${id}`,
      rules,
    } as const);

    this.ruleset = [
      ...defaults.map(rule => map(rule)),
      ...typeof override === "undefined"
        ? [] as const
        : [map([`${scope}:override`, override])] as const,
    ] as const;
  }
}
