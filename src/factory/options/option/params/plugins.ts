export type Plugins<PluginId extends string> = Record<literalful<PluginId>, { configs: unknown }>;
