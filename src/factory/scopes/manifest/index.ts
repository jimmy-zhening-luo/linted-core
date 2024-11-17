import type globals from "globals";
import type { Parsers } from "../../../scopes";

export abstract class ScopeManifest<
  Parser extends Parsers | false = false,
  ParserOptions extends object = object,
  Global extends keyof typeof globals | false = false,
  Processor extends object = object,
  Language extends object = object,
> {
  public abstract readonly processor: (Processor extends { readonly processor: infer P }
    ? string extends P
      ? Record<string, never>
      : { readonly processor: P }
    : Record<string, never>);
  public abstract readonly language: (Language extends { readonly language: infer L }
    ? string extends L
      ? Record<string, never>
      : { readonly language: L }
    : Record<string, never>);
  public abstract readonly parserOptions: (ParserOptions extends { readonly parser: infer P }
    ? P extends Parser
      ? ParserOptions
      : (Omit<ParserOptions, "parser"> & { readonly parser: null })
    : ParserOptions & { readonly parser: null });
  public abstract readonly languageOptions: (
    [Parser] extends [boolean]
      ? { readonly parser: null }
      : { readonly parser: Parser }

  ) & (
    Global extends boolean
      ? { readonly globals?: never }
      : { readonly globals: Global }
  );
}
