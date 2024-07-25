type RuleRecord = readonly [
  string,
  Record<string, "error" | "warn" | "off" | ["error" | "warn" | "off", ...unknown[]]>,
];

export type { RuleRecord as default };
