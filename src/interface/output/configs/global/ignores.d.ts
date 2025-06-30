import type { Config } from "../../../config";

export interface Ignores {
  name: "linted/*/ignores/";
  ignores: Config["ignores"];
}
