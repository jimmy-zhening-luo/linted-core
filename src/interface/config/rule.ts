export type State
= | 0
  | 1
  | 2
  | "off"
  | "warn"
  | "error";
export type Rules = Record<
  string,
  | State
  | readonly [
    State,
    ...unknown[],
  ]
>;
