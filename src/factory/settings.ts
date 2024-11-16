import js from "./scopes/js";
import ts from "./scopes/ts";
import svelte from "./scopes/svelte";
import mocha from "./scopes/mocha";
import html from "./scopes/html";
import json from "./scopes/json";
import jsonc from "./scopes/jsonc";
import yml from "./scopes/yml";

export const ScopeSettings = {
  js,
  ts,
  svelte,
  mocha,
  html,
  json,
  jsonc,
  yml,
} as const;
