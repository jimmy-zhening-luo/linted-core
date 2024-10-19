export interface Linter {
  noInlineConfig: boolean;
  reportUnusedDisableDirectives:
    | "error"
    | "warn"
    | "off"
  ;
}
