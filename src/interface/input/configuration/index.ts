import type { Settings } from "./settings";
import type { Defaults } from "./defaults";
import type { Extensions } from "./extensions";
import type { IAttachment } from "./attachment";

export interface Configuration<
  Scope extends string,
  Parser extends string,
> {
  settings: Settings<
    Scope,
    Parser
  >;
  defaults: Defaults<Scope>;
  extensions: Extensions<Scope>;
  attachments: readonly IAttachment[];
}
