import type { Scope } from "../../../../scopes/index.js";

type FileBase = Readonly<Record<Scope, readonly string[]>>;

export type {
  FileBase,
  FileBase as default,
};
