import type { Scope } from "../Factory.js";
import JsOption from "./option/js/index.js";
import TsOption from "./option/ts/index.js";
import SvelteOption from "./option/svelte/index.js";
import HtmlOption from "./option/html/index.js";
import JsonOption from "./option/json/index.js";
import JsoncOption from "./option/jsonc/index.js";
import YmlOption from "./option/yml/index.js";

export type { Scope };
export default {
  js: JsOption,
  ts: TsOption,
  svelte: SvelteOption,
  html: HtmlOption,
  json: JsonOption,
  jsonc: JsoncOption,
  yml: YmlOption,
} satisfies Record<Scope, unknown>;
