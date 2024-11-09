export type {
  GlobalConfigIgnores,
  GlobalConfigSystem,
} from "..";

import type { GlobalConfigs } from "./global";
import type { ScopedConfig } from "..";

export type Output = [
  ...GlobalConfigs,
  ...ScopedConfig[],
];
