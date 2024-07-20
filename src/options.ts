import type { Scope } from "./scopes.js";
import JsOption from "./options/JsOption.js";
import TsOption from "./options/TsOption.js";
import SvelteOption from "./options/SvelteOption.js";
import HtmlOption from "./options/HtmlOption.js";
import JsonOption from "./options/JsonOption.js";
import JsoncOption from "./options/JsoncOption.js";
import YmlOption from "./options/YmlOption.js";

export default {
  js: JsOption,
  ts: TsOption,
  svelte: SvelteOption,
  html: HtmlOption,
  json: JsonOption,
  jsonc: JsoncOption,
  yml: YmlOption,
} satisfies Record<Scope, unknown>;
