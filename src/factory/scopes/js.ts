import { ScopeSetting } from "./setting";

export default class JsSetting extends ScopeSetting {
  public readonly processor = {} as const;
  public readonly language = {} as const;
  public readonly parserOptions = {} as const;
  public readonly languageOptions = {} as const;
}
