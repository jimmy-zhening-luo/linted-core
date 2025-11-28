export type State
= | 0
  | 1
  | 2
  | "off"
  | "warn"
  | "error";
export type Rule = State | [State, ...unknown[]];
export type Rules = Record<
  string,
  Readonly<Rule>
>;
