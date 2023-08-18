import { Request, Response } from "express";

abstract class BaseController {
  protected abstract executeImpl(req: Request, res: Response): Promise<void | any>;

  public async execute(req: Request, res: Response): Promise<void | any> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.log(err);
      // this.fail(res, "An unexpected error occurred");
    }
  }

  fail(res: Response, message: Error | string) {
    return res.status(500).json({ message });
  }
}

export { BaseController };
