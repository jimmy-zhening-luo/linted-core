export type {
  GlobalConfigSystem,
  GlobalConfigIgnores,
} from "..";

import type { GlobalConfigs } from "./global";
import type { ScopedConfig } from "..";

export type Output = [
  ...GlobalConfigs,
  ...ScopedConfig[],
];
