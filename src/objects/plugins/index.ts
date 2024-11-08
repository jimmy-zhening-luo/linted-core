import type { Plugin } from "./plugin";

export type Plugins = Record<
  Plugin,
  { configs: unknown }
>;
