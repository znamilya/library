export type EntityId = string;

export type NonEmptyArray<T> = [T, ...T[]];

export type CollectionComponentProps<TName extends string, TItem, TOther = {}> = {
  [key in TName]: NonEmptyArray<TItem>;
} & TOther;
