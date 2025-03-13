import type { Config } from "../proto";

export interface Imports<
  Plugins extends string,
  Parsers extends string,
> {
  readonly plugins: Config.Config<Plugins>["plugins"];
  readonly parsers: Readonly<Record<
    Parsers,
    unknown
  >>;
}
