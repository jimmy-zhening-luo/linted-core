export type { Scope } from "../scopes";

import type { PluginsInput } from "./plugins";
import type { ParsersInput } from "./parsers";
import type { FilesInput } from "./files";
import type { RulesInput } from "./rules";

export interface Input {
  plugins: PluginsInput;
  parsers: ParsersInput;
  files: FilesInput;
  rules: RulesInput;
}
export namespace Input {
  export type Rule = RulesInput;
  export namespace Rule {
    export type Entry = RulesInput.Entry;
    export namespace Entry {
      export type Id = RulesInput.Entry.Id;
      export type Record = RulesInput.Entry.Record;
    }
  }
}
