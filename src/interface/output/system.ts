import type {
  Plugins,
  ConfigProperty,
} from "..";
import type {
  LinterOptions,
  BaseLanguageOptions,
} from "./options";

export type GlobalConfigSystem = Partial<Record<
  Exclude<
    ConfigProperty,
    | "name"
    | "plugins"
    | "linterOptions"
    | "languageOptions"
  >,
  never
>> & {
  name: "linted/global/settings";
  plugins: Plugins;
  linterOptions: LinterOptions;
  languageOptions: Partial<BaseLanguageOptions>;
};
