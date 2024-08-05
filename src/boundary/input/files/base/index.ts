import type { Scope } from "../../../../scopes/index.js";

type Base = Readonly<Record<Scope, readonly string[]>>;

export type { Base, Base as default };
