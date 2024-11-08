export type LanguageOptions<
  ParserOptions extends object | boolean,
  GlobalTypes extends string,
> =
 & (literalful<GlobalTypes> extends never ? object : { globals: Record<string, unknown> })
 & (
    ParserOptions extends boolean
      ? Truth<ParserOptions> extends never
        ? object
        : { parser: unknown }
      : ParserOptions extends object
        ? Interface<ParserOptions> extends never
          ? object
          : { parser: unknown; parserOptions: ParserOptions }
        : object
  );
