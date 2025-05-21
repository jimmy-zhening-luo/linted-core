import type { Config } from "../proto";

export interface Imported<
  Plugins extends string,
  Parsers extends string,
> {
  plugins: Config.Config<Plugins>["plugins"];
  parsers: Record<
    Parsers,
    unknown
  >;
}
