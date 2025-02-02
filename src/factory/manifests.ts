import js from "./scopes/js";
import ts from "./scopes/ts";
import mocha from "./scopes/mocha";
import svelte from "./scopes/svelte";
import html from "./scopes/html";
import css from "./scopes/css";
import json from "./scopes/json";
import jsonc from "./scopes/jsonc";
import yml from "./scopes/yml";

export const ScopeManifests = {
  js,
  ts,
  mocha,
  svelte,
  html,
  css,
  json,
  jsonc,
  yml,
} as const;
