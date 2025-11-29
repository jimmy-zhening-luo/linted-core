import type { Setting } from "./setting";

export type Settings<Scope extends string> = Partial<
  Record<
    Scope,
    Setting
  >
>;
