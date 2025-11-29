import type { Setting } from "./setting";

export type Settings<Scope extends string> = Readonly<
  Partial<
    Record<
      Scope,
      Setting
    >
  >
>;
