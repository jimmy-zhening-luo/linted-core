import type { Preset } from "./preset";
import type { Overrides } from "./overrides";

export type { Scope } from "..";
export interface Rules {
  rules: Preset;
  overrides: Overrides;
}
