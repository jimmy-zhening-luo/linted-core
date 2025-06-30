import type {
  scopes,
  Dependencies,
} from "../../scope";
import type { Imports } from "./imports";
import type { Configuration } from "./configuration";

export interface Input {
  imports: Imports<
    Dependencies.Plugins,
    Dependencies.Parsers
  >;
  configuration: Configuration<
    typeof scopes[number]
  >;
}
