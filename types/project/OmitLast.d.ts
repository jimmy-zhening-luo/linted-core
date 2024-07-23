declare type OmitLast<A> = A extends [...infer An_1, unknown] ? An_1 : never;
