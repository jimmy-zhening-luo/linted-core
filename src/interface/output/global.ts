import type {
  GlobalConfigIgnores,
  GlobalConfigSystem,
} from ".";

export type GlobalConfigs = readonly [
  GlobalConfigIgnores,
  GlobalConfigSystem,
];
