import type * as Object from "./state/index.js";

type Object = Readonly<Record<
  string,
  | Object.Level
  | readonly [Object.Level, ...unknown[]]
>>;

export type { Object, Object as default };
