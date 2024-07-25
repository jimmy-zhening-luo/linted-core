import type Severity from "./state/severity.js";

type RuleObject = Record<string, Severity | [Severity, ...unknown[]]>;

export type { RuleObject as default };
