import type { Config } from "../..";
import type { Only } from "./only";

export type Ignores = Only<
  Config,
  (
    & { readonly name: `linted/*/ignores` }
    & Pick<Config, "ignores">
  )
>;
