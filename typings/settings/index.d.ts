import type { Setting } from "./setting";

export type Settings<
  Scope extends string,
  Plugin extends string,
  Parser extends Scope,
> = Partial<
  Record<
    Scope,
    Setting<Plugin, Parser>
  >
>;
