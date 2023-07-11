export type UseCase<TParams extends any[], TResult> = (...params: TParams) => TResult;
