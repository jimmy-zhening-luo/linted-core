type Plugins<PluginId extends string> = Record<literalful<PluginId>, { configs: unknown }>;

export type { Plugins, Plugins as default };
