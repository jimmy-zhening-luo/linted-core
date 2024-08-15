import type Base from "./base/index.js";
import type Includes from "./includes/index.js";

type Files = { base: Base; includes: Includes };

export type {
  Base,
  Includes,
  Files,
  Files as default,
};
