import type { Scope } from "../../module";
import JsOption from "./option/js";
import TsOption from "./option/ts";
import SvelteOption from "./option/svelte";
import HtmlOption from "./option/html";
import JsonOption from "./option/json";
import JsoncOption from "./option/jsonc";
import YmlOption from "./option/yml";

export default {
  js: JsOption,
  ts: TsOption,
  svelte: SvelteOption,
  html: HtmlOption,
  json: JsonOption,
  jsonc: JsoncOption,
  yml: YmlOption,
} satisfies Record<Scope, unknown>;
