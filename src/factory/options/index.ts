import type { Scope } from "../../index.js";
import {
  JsOption,
  TsOption,
  SvelteOption,
  HtmlOption,
  JsonOption,
  JsoncOption,
  YmlOption,
} from "./option/index.js";

export default {
  js: JsOption,
  ts: TsOption,
  svelte: SvelteOption,
  html: HtmlOption,
  json: JsonOption,
  jsonc: JsoncOption,
  yml: YmlOption,
} satisfies Record<Scope, unknown>;
