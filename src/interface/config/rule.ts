export type Entry = readonly [
  string,
  Config,
];
export type Config = Readonly<Record<
  string,
  | State
  | readonly [State, ...readonly unknown[]]
>>;
export type State = (
  | "error"
  | "warn"
  | "off"
);
