import { Defaults } from "./defaults";
import { Extensions } from "./extensions";

export interface Configuration<
  Scope extends string,
> {
  defaults: Defaults<Scope>;
  extensions: Extensions<Scope>;
}
