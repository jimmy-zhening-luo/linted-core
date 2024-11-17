import type globals from "globals";
import type { Parsers } from "../../../scopes";

export abstract class ScopeManifest<
  Parser extends Parsers | false = false,
  ParserOptions extends object = object,
> {
  public abstract readonly processor: { readonly processor: string } | Record<string, never>;
  public abstract readonly language: { readonly language: string } | Record<string, never>;
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
    { readonly globals: null | keyof typeof globals }
  );
}
