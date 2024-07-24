import Options from "./options/Options.js";
import Files from "./files/Files.js";
import Ruleset, { Rule } from "./ruleset/Ruleset.js";
import type { Scope } from "../index.js";

export type Blanka = ConstructorParameters<typeof Options["js"]>;
export {
  Options,
  Files,
  Ruleset,
  Rule,
  type Scope,
};
