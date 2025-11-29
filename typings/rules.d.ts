export type State
= | 0
  | 1
  | 2
  | "off"
  | "warn"
  | "error";
export type Rule = State | readonly [State, ...unknown[]];
export type Rules = Readonly<
  Record<
    string,
    Rule
  >
>;
