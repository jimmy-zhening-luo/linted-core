export interface LinterOptions {
  noInlineConfig: boolean;
  reportUnusedDisableDirectives:
    | "error"
    | "warn"
    | "off"
  ;
}
