import type { Plugins } from "./plugins";
import type { Parsers } from "./parsers";
import type { Files } from "./files";
import type { Rules } from "./rules";

export type { Scope } from "../scopes";
export interface Input {
  files: Files;
  rules: Rules;
  plugins: Plugins;
  parsers: Parsers;
}
