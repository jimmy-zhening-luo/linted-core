import type { IConfig } from "../../config";

export type Attachment
  = & {
    files: string[];
  }
  & Partial<
    Omit<
      IConfig,
      "files"
    >
  >;

