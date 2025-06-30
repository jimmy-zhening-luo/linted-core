export type State = (
  | "error"
  | "warn"
  | "off"
);
export type Rules = Record<
  string,
  | State
  | [
    State,
    ...unknown[]
  ]
>;
