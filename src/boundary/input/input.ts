import type plugins from "./plugins/plugins.js";
import type parsers from "./parsers/parsers.js";

namespace Input {
  export type Plugins = plugins;
  export type Parsers = parsers;
}

export type { Input as default };
