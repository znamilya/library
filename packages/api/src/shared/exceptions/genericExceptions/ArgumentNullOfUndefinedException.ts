class ArgumentNullOfUndefinedException extends Error {
  constructor(argumentName: string) {
    super(`${argumentName} is null or undefined`);

    this.name = "ArgumentNullOfUndefinedException";
  }
}

export { ArgumentNullOfUndefinedException };
