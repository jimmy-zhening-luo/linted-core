import type {
  Plugins,
  ConfigProperty,
} from ".";

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
  name: `linted`;
  plugins: Plugins;
  linterOptions: {
    noInlineConfig: boolean;
    reportUnusedDisableDirectives:
      | "error"
      | "warn"
      | "off"
    ;
  };
  languageOptions: {
    sourceType?:
      | "module"
      | "script"
    ;
    ecmaVersion?:
      | "latest"
      | 3
      | 5
      | ToNumber<`20${(
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23
        | 24
      )}`>;
  };
};
