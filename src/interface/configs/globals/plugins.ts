import type { Config, Imports } from "../..";
import type { Only } from "./only";

export type Plugins = Only<
  Config,
  (
    & { readonly name: `linted/*/plugins` }
    & Pick<Config<Imports.Plugins>, "plugins">
  )
>;
