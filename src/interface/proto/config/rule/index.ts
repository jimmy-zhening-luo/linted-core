export interface NamedRuleBag {
  id: string;
  readonly rules: RuleBag;
}
export type RuleBag = Readonly<Record<
  string,
  | RuleState
  | readonly [RuleState, ...readonly unknown[]]
>>;
export type RuleState = (
  | "error"
  | "warn"
  | "off"
);
