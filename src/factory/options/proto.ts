export type OptionProto<
  ParserOptions extends
  | object
  | boolean,
  G extends string | boolean,
  Processor extends object,
  Language extends object,
> = (
{ languageOptions: (G extends never
  ? object
  : G extends boolean
    ? object
    : G extends string
      ? string extends G
        ? object
        : { globals: Record<string, unknown> }
      : object
)
& (
   ParserOptions extends never
     ? object
     : ParserOptions extends boolean
       ? ParserOptions extends true
         ? { parser: unknown }
         : object
       : { parser: unknown; parserOptions: ParserOptions }
); }
& (
    Processor extends never
      ? object
      : Processor extends { processor: infer P }
        ? string extends P
          ? object
          : { processor: P }
        : object
    )
    & (
    Language extends never
      ? object
      : Language extends { language: infer L }
        ? string extends L
          ? object
          : { language: L }
        : object
    )
);
