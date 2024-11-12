import type { GlobalIgnoreDefaults } from "./defaults";

export type GlobalIgnoreExtend = {
  inherit?: boolean;
} & Partial<GlobalIgnoreDefaults>;
