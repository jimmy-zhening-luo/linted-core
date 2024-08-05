import type { Plugins as Dependencies } from "../../../dependency/index.js";

type Plugins = Readonly<Record<Dependencies, { configs: unknown }>>;

export type { Dependencies, Plugins, Plugins as default };
