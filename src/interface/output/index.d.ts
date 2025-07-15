import type * as Config from "./configs";

export type Output = readonly [
  Config.Plugins,
  Config.Settings,
  Config.GlobalIgnores,
  ...(
    | Config.ScopeSettings
    | Config.ScopeRules
  )[],
  ...Config.Attachment[],
];
