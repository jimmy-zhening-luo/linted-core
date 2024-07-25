declare type IOLanguage<
  IsEcma extends boolean,
  ParserOptions extends object | boolean,
  GlobalTypes extends string,
> =
 & (True<IsEcma> extends never ? object : { ecmaVersion: IOLanguageEcma; sourceType: IOLanguageSource })
 & (literalful<GlobalTypes> extends never ? object : { globals: IOLanguageGlobals<GlobalTypes> })
 & (
    ParserOptions extends boolean
      ? True<ParserOptions> extends never
        ? object
        : { parser: unknown }
      : ParserOptions extends object
        ? Interface<ParserOptions> extends never
          ? object
          : { parser: unknown; parserOptions: ParserOptions }
        : object
  );
