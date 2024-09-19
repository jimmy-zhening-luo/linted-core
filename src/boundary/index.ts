import type * as Input from "./input/index.js";
import type * as Output from "./output/index.js";

type Output = Output.Config;

namespace Boundary {
  export type Input = Input.Input;
  export type Output = Output.Config;
}

export type {
  Input,
  Output,
  Boundary as default,
};
