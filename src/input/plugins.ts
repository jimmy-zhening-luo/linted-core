import type { Plugins as Imports } from "./imports/plugins";

export type Plugins = Readonly<Record<Imports, { configs: unknown }>>;
