import type globals from "globals";
import type { Import } from "../../../scope";

export abstract class ScopeManifest<Parser extends Import.Parser | false = false> {
  public abstract readonly processor: { readonly processor: string } | Record<string, never>;
  public abstract readonly language: { readonly language: string } | Record<string, never>;
  public abstract readonly parserOptions: object & { readonly parser: null | Exclude<Parser, boolean> };
  public abstract readonly languageOptions: (
    [Parser] extends [boolean]
      ? { readonly parser: null }
      : { readonly parser: Parser }

  ) & (
    { readonly globals: null | keyof typeof globals }
  );
}
