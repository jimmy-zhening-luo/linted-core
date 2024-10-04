import type FileBase from "./default/index.js";
import type Includes from "./includes/index.js";

type Files = { files: FileBase; includes: Includes };

export type {
  FileBase,
  Includes,
  Files,
  Files as default,
};
