import type { Proto } from "../proto";

export interface Imports<
  Plugins extends string,
  Parsers extends string,
> {
  readonly plugins: Proto.Config<Plugins>["plugins"];
  readonly parsers: Readonly<Record<
    Parsers,
    unknown
  >>;
}
