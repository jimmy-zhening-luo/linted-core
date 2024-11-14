import { ScopeSetting } from "../setting";

export default class Js extends ScopeSetting<"js"> {
  public readonly scope = "js";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    return {};
  }
}
