export type State
= | 0
  | 1
  | 2
  | "off"
  | "warn"
  | "error";
export type Rule = State | [State, ...unknown[]];
export type Rules = Record<
  string,
  Readonly<Rule>
>;
export type MutableRules<Configs> = Configs extends Array<
  infer Config extends {
    name: string;
    rules: Rules;
  }
>
  ? Array<
    {
      name: Config["name"];
      rules: {
        [Rule in keyof Config["rules"]]: Mutable<
          Config["rules"][Rule]
        >
      };
    }
  >
  : Configs;

type Mutable<Rule> = Rule extends object
  ? { -readonly [Index in keyof Rule]: Rule[Index] }
  : Rule;
