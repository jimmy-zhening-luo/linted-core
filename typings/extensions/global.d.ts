export type GlobalExtension = {
  "*": {
    readonly ignores?: readonly string[];
    readonly override?: boolean;
  };
};
