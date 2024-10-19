import type { Scope } from ".";

export interface FilesInput {
  files: Record<Scope, string[]>;
  includes: Partial<FilesInput["files"]>;
}
