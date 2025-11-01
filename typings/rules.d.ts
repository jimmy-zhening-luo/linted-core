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

export type MutableRules = {
  [Rule in keyof Rules]: Mutable<Rules[Rule]>
};

export type MutableRuleConfigs<Configs> = Configs extends Array<
  infer Config extends {
    rules: Rules;
  }
>
  ? Array<
    {
      rules: {
        [Rule in keyof Config["rules"]]: Mutable<
          Config["rules"][Rule]
        >
      };
    }
  >
  : Configs;

export type Mutable<Rule> = Rule extends object
  ? { -readonly [Index in keyof Rule]: Rule[Index] }
  : Rule;
