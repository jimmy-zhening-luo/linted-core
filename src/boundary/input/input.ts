import type plugins from "./plugins/plugins.js";
import type parsers from "./parsers/parsers.js";
import type files from "./files/files.js";
import type rules from "./rules/rules.js";
import type { RuleEntry, RuleObject } from "./rules/rules.js";
import type overrides from "./overrides/overrides.js";

namespace Input {
  export type Plugins = plugins;
  export type Parsers = parsers;
  export type Files = files;
  export type Rules = rules;
  export namespace Rules {
    export type Entry = RuleEntry;
    export namespace Entry {
      export type Object = RuleObject;
    }
  }
  export type Overrides = overrides;
}

export type { Input as default };
