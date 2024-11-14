export type RuleEntry = readonly [
  string,
  RuleRecord,
];
export type RuleRecord = Readonly<Record<
  string,
  | RuleState
  | readonly [RuleState, ...readonly unknown[]]
>>;
export type RuleState = (
  | "error"
  | "warn"
  | "off"
);
