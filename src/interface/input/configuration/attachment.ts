import type { IConfig } from "../../config";

export type IAttachment
  = & {
    files: string[];
  }
  & Partial<
    Omit<
      IConfig,
      "files"
    >
  >;

