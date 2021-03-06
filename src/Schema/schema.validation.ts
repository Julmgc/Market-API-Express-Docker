import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import AppError from "../errors/AppError";

export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await schema.validate(body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (e: any) {
      next(new AppError(e.errors.join(", "), 400));
    }
  };
