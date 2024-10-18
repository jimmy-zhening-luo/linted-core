import type { Scope } from "@eslinted/core";

export type Base = Readonly<Record<Scope, readonly string[]>>;
