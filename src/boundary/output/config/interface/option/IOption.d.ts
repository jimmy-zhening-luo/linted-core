declare type IOption<
  Name extends string,
  PluginId extends string,
  IsEcma extends boolean,
  ParserOptions extends object | boolean,
  GlobalTypes extends string,
  Processor extends object,
> =
  {
    name: IOName<Name>;
    files: readonly string[];
    linterOptions: IOLinter;
    languageOptions: IOLanguage<
      IsEcma,
      ParserOptions,
      GlobalTypes
    >;
  }
  & (IOPlugins<PluginId> extends never ? object : { plugins: IOPlugins<PluginId> })
  & (Interface<Processor> extends never ? object : Interface<Processor> extends { "interface": string } ? Interface<Processor> : object);
