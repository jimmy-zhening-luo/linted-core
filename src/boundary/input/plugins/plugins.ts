import type { Scope, Options } from "../../../factory/Factory.js";

type Plugins = {
  [S in Scope]: InstanceType<typeof Options[S]>["plugins"];
};

export type { Plugins as default };
