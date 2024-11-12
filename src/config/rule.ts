export type RuleEntry = readonly [
  string,
  RuleRecord,
];
export type RuleRecord = Record<
  string,
  | RuleState
  | readonly [RuleState, ...unknown[]]
>;
export type RuleState = (
  | "error"
  | "warn"
  | "off"
);
