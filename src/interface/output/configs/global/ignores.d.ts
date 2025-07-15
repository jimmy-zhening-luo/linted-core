import type { IConfig } from "../../../config";

export interface GlobalIgnores {
  name: "linted/*/ignores/";
  ignores: IConfig["ignores"];
}
