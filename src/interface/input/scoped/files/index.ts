export type { Scope } from "..";

import type { FilesDefaults } from "./defaults";
import type { FilesIncludes } from "./includes";

export interface InputFiles {
  files: FilesDefaults;
  includes: FilesIncludes;
}
