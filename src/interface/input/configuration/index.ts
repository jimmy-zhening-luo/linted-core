import type { Settings } from "./settings";
import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";
import type { IAttachment } from "./attachment";

export interface Configuration<
  Parser extends string,
  Scope extends string,
  OptionalScope extends Scope,
> {
  settings: Settings<
    Scope,
    Parser
  >;
  defaults: Defaults<Scope>;
  extensions: Extensions<
    Scope,
    OptionalScope
  >;
  attachments: readonly IAttachment[];
}
