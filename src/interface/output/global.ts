import type {
  GlobalConfigSystem,
  GlobalConfigIgnores,
} from ".";

export type GlobalConfigs = readonly [
  GlobalConfigSystem,
  GlobalConfigIgnores,
];
