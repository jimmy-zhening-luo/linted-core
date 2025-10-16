export interface GlobalExtension {
  "*": {
    ignores?: string[];
    override?: boolean;
  };
}
