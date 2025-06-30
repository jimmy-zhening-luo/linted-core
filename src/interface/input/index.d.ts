import type {
  scopes,
  Dependencies,
} from "../../scope";
import type { Imports } from "./imports";
import type { Confuguration } from "./configuration";

export interface Input {
  imports: Imports<
    Dependencies.Plugins,
    Dependencies.Parsers
  >;
  configuration: Configuration<
    typeof scopes[number]
  >;
}
