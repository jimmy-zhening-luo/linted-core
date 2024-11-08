export type {
  Scope,
  Plugins,
} from "..";

import type { InputPlugins } from "./plugins";
import type { InputParsers } from "./parsers";

export interface Imports {
  plugins: InputPlugins;
  parsers: InputParsers;
}
