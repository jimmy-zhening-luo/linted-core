import type { Scope } from "../../../scopes/scopes.js";
import type { Options } from "../../../factory/_factory.js";

type Plugins = {
  readonly [S in Scope]: InstanceType<typeof Options[S]>["plugins"];
};

export type { Plugins as default };
