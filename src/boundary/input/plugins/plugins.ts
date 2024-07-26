import type { Plugins as Dependencies } from "../../../dependency/dependency.js";

type Plugins = Readonly<Record<Dependencies, { configs: unknown }>>;

export type {
  Plugins as default,
  Plugins,
  Dependencies,
};
