import { ScopeSetting } from "../setting";

export default class Js extends ScopeSetting<"js"> {
  public readonly scope = "js";
  public readonly processor = {} as const;
  public readonly language = {} as const;

  public get languageOptions() {
    return {} as const;
  }
}
