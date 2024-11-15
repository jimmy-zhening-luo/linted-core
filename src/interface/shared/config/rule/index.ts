export type NamedBag = readonly [
  string,
  Bag,
];
export type Bag = Readonly<Record<
  string,
  | State
  | readonly [State, ...readonly unknown[]]
>>;
export type State = (
  | "error"
  | "warn"
  | "off"
);
