export type Plugins<PluginId extends string> = { [P in literalful<PluginId>]: { configs: unknown } };
