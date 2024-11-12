export type { GlobalConfigIgnores } from "..";

import type { GlobalIgnoreDefaults } from "./defaults";
import type { GlobalIgnoreExtend } from "./extend";

export interface InputGlobalIgnores {
  ignores: GlobalIgnoreDefaults;
  extend: GlobalIgnoreExtend;
}
