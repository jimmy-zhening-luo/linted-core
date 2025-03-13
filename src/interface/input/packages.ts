import type { Config } from "../shared";

export interface Packages<
  Plugins extends string,
  Parsers extends string,
> {
  readonly plugins: Config<Plugins>["plugins"];
  readonly parsers: Readonly<Record<
    Parsers,
    unknown
  >>;
}
