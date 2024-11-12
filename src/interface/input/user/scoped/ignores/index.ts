export type { Scope } from "..";

import type { ScopedIgnoreDefaults } from "./defaults";
import type { ScopedIgnoreExtend } from "./extend";

export interface InputScopedIgnores {
  ignores: ScopedIgnoreDefaults;
  extend: ScopedIgnoreExtend;
}
