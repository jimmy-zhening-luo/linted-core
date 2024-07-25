import type plugins from "./input/plugins.js";
import type parsers from "./input/parsers.js";
import type ruleRecord from "./input/ruleRecord.js";

namespace Input {
  export type Plugins = plugins;
  export type Parsers = parsers;
  export type RuleRecord = ruleRecord;
}

export type { Input as default };
