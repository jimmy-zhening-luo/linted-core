import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";

export interface Configuration<
  Scope extends string,
> {
  defaults: Defaults<Scope>;
  extensions: Extensions<Scope>;
}
