import type { Rules } from "../rules";

export interface Defaults<Scope extends string> {
  readonly files: Record<
    Scope,
    (string | readonly string[])[]
  >;
  readonly ignores: Partial<
    Record<
      Scope | "*",
      string[]
    >
  >;
  readonly rules: Record<
    Scope | "*",
    Record<"rules", Rules>[]
  >;
}
