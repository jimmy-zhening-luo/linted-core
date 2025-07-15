import type { IConfig } from "../../../config";

export interface Plugins {
  name: "linted/*/plugins/";
  plugins: IConfig["plugins"];
}
