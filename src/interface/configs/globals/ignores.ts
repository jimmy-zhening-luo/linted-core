import type { Only } from "./only";
import type { Config } from "../config";

export type IgnoresConfig = Only<
  Config,
  (
    & { readonly name: `linted/*/ignores` }
    & Pick<Config, "ignores">
  )
>;
