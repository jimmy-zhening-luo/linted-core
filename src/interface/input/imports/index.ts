export type { Scope } from "..";

import type { Plugins } from "..";
import type { Parsers } from "./parsers";

export interface InputImports {
  plugins: Plugins;
  parsers: Parsers;
}
