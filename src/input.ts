import type { Plugins } from "./inputs/plugins";
import type { Parsers } from "./inputs/parsers";
import type { Files } from "./inputs/files";
import type { Rules } from "./inputs/rules";

export interface Input {
  files: Files;
  rules: Rules;
  plugins: Plugins;
  parsers: Parsers;
}
