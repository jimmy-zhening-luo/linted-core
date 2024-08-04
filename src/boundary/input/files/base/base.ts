import type { Scope } from "../../../../scopes/Scopes.js";
import type * as Base from "./list/list.js";

type Base = Readonly<Record<Scope, Base.List>>;

export type { Base, Base as default };
