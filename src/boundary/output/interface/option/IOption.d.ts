declare type IOption<
  PluginId extends string,
  IsEcma extends boolean,
  ParserOptions extends object | boolean,
  GlobalTypes extends string,
  Processor extends object,
> =
  {
    linterOptions: IOLinter;
    languageOptions: IOLanguage<
      IsEcma,
      ParserOptions,
      GlobalTypes
    >;
  }
  & (IOPlugins<PluginId> extends never ? object : { plugins: IOPlugins<PluginId> })
  & (Interface<Processor> extends never ? object : Interface<Processor> extends { "interface": string } ? Interface<Processor> : object);
