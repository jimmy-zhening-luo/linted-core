import type {
  Input,
  Output,
} from "./interface";
import type {
  RequiredPlugin,
  RequiredParser,
} from "./scope";
import {
  scopes,
  optionalScopes,
  tree,
} from "./scope";
import { Factory } from "./factory";

export default function (
  {
    imports: {
      required: {
        plugins,
        parsers,
      },
      optional = {},
    },
    configuration: {
      settings,
      defaults,
      extensions,
    },
  }: Input<
    RequiredPlugin,
    RequiredParser,
    (typeof optionalScopes[number]),
    (typeof scopes[number])
  >,
) {
  try {
    const factory = new Factory<
      RequiredPlugin,
      RequiredParser,
      (typeof optionalScopes[number]),
      (typeof scopes[number])
    >(
        optionalScopes,
        tree,
        settings,
        {
          ...parsers,
          ..."svelte" in optional
            ? {
                svelte: optional.svelte.parser,
              }
            : {},
        },
        defaults,
        extensions,
        );

    return [
      {
        name: "linted/*/plugins/",
        plugins: {
          ...plugins,
          ..."svelte" in optional
            ? {
                svelte: optional.svelte.plugin,
              }
            : {},
        },
      },
      ...factory.globals,
      ...scopes
        .flatMap(
          scope => factory.scope(scope),
        ),
    ] satisfies Output as unknown[];
  }
  catch (e) {
    throw new Error(
      "linted-core: ",
      { cause: e },
    );
  }
}
