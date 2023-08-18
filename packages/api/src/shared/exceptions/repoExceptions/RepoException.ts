class RepoException extends Error {
  constructor(message: string, public cause?: Error) {
    super(message);

    this.name = this.constructor.name;
  }
}

export { RepoException };
