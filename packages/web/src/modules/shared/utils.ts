import { NonEmptyArray } from "./types";

export const isNonEmptyArray = <A>(array: Array<A>): array is NonEmptyArray<A> => array.length > 0;
