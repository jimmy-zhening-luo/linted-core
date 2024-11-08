import Option from "./option";

export default class Js extends Option<"js"> {
  public readonly scope = "js";
  public readonly processor = {};
  public readonly language = {};

  public get languageOptions() {
    return {};
  }
}
