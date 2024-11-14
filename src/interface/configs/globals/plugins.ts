import type { Only } from "./only";
import type { Config } from "../config";
import type { ImportPlugins } from "../..";

export type PluginsConfig = Only<
  Config,
  (
    & { readonly name: `linted/*/plugins` }
    & Pick<Config<ImportPlugins>, "plugins">
  )
>;
