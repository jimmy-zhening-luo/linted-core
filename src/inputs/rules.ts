import type { Preset } from "./rules/preset";
import type { Overrides } from "./rules/overrides";

export interface Rules {
  rules: Preset;
  overrides: Overrides;
}
