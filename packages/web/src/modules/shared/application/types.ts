export type UseCase<TParams extends any[], TExecuteParams, TResult> = (...params: TParams) => {
  execute: (params: TExecuteParams) => TResult;
};
