import type { Setting } from "./setting";

export type Settings<
  Scope extends string,
  Parser extends Scope,
> = Partial<
  Record<
    Scope,
    Setting<Parser>
  >
>;
