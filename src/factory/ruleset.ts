import type { Rule } from "..";

export class Ruleset<Scopes extends string> {
  public readonly ruleset: { id: `${Scopes}:${string}`; rules: Rule.Bag }[];

  constructor(
    public readonly scope: Scopes,
    defaults: readonly Rule.NamedBag[],
    override?: Rule.Bag,
  ) {
    const map = ([id, rules]: Rule.NamedBag) => ({
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
