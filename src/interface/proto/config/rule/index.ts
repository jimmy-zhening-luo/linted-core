export interface NamedRuleBag {
  id: string;
  rules: RuleBag;
}
export type RuleBag = Record<
  string,
  | RuleState
  | readonly [RuleState, ...unknown[]]
>;
export type RuleState = (
  | "error"
  | "warn"
  | "off"
);
