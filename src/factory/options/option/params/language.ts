import type { Ecma } from "./languageOptions/ecma";
import type { Source } from "./languageOptions/source";

export type LanguageOptions<
  IsEcma extends boolean,
  ParserOptions extends object | boolean,
  GlobalTypes extends string,
> =
 & (True<IsEcma> extends never ? object : { ecmaVersion: Ecma; sourceType: Source })
 & (literalful<GlobalTypes> extends never ? object : { globals: Record<string, unknown> })
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
