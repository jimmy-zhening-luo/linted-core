import type input from "./input/input.js";
import type output from "./output/output.js";

namespace Boundary {
  export namespace Input {
    export type Plugins = input.Plugins;
    export type Parsers = input.Parsers;
  }
  export type Output = output;
}

export type { Boundary as default };
