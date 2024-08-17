import type Plugins from "./plugins/index.js";
import type Parsers from "./parsers/index.js";
import type * as Files from "./files/index.js";
import type * as Rules from "./rules/index.js";

type Files = Files.Files;
type Rules = Rules.Rules;

interface Input {
  files: Files;
  rules: Rules;
  plugins: Plugins;
  parsers: Parsers;
}

export type {
  Files,
  Rules,
  Plugins,
  Parsers,
  Input,
  Input as default,
};
