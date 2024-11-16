import globals from "globals";
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
  public abstract readonly parserOptions: (ParserOptions extends { readonly parserOptions: infer PO }
    ? PO extends { readonly parser: infer P }
      ? P extends Parser
        ? ParserOptions
        : Record<string, never>
      : ParserOptions
    : Record<string, never>);
  public abstract readonly languageOptions: (
    [Parser] extends [boolean]
      ? { readonly parser?: never }
      : { parser: Parser }

  ) & (
    Global extends boolean
      ? { readonly globals?: never }
      : { readonly globals: Readonly<Record<string, unknown>> }
  );

  public get option() {
    const {
      languageOptions, parserOptions, processor, language,
    } = this;

    return {
      languageOptions: {
        ...languageOptions,
        ...parserOptions,
      },
      ...processor,
      ...language,
    } as const;
  }

  protected globals(global: Global & keyof typeof globals) {
    if (typeof global === "boolean")
      throw new TypeError("`global` must be a string key of `globals` package");

    return globals[global];
  }
}
