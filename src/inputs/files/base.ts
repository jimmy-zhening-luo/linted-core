import type { Scope } from "@eslinted/core/scopes";

export type Base = Readonly<Record<Scope, readonly string[]>>;
