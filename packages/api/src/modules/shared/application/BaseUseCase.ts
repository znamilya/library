abstract class BaseUseCase {
  abstract execute(): Promise<void | any>;
}

export { BaseUseCase };
