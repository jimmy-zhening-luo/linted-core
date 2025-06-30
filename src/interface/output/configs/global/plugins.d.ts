import type { Config } from "../../../config";

export interface Plugins {
  name: "linted/*/plugins/";
  plugins: Config["plugins"];
}
