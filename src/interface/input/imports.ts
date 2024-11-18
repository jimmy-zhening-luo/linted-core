import type { Config } from "../shared";

export interface Imports<
  Plugins extends string,
  Parsers extends string,
> {
  readonly plugins: Config<Plugins>["plugins"];
  readonly parsers: Readonly<Record<
    Parsers,
    unknown
  >>;
}
