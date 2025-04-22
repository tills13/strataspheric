export type Tail<T> = T extends [a0: unknown, ...infer P] ? P : never;
