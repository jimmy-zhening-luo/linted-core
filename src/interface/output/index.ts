export type {
  GlobalConfigIgnores,
  GlobalConfigSystem,
} from "..";

import type { GlobalConfigs } from "./globals";
import type { ScopedConfig } from "..";

export type Output = [
  ...GlobalConfigs,
  ...ScopedConfig[],
];
