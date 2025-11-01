import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";

export interface Configuration<
  Scope extends string,
  Optional extends Scope,
> {
  defaults: Defaults<Scope>;
  extensions: Partial<
    Extensions<
      Scope,
      Optional
    >
  >;
}
