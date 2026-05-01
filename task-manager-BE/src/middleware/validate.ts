import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validate =
  (schema: ZodType<any, any, any>, customMessage?: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorDetails = err.issues.map((e) => ({
          field: e.path?.join("."),
          message: e.message,
        }));
        const mainMessage =
          errorDetails[0]?.message || customMessage || "Validation failed";
        return res.status(400).json({
          success: false,
          message: mainMessage,
          errors: errorDetails,
        });
      }
      return res.status(400).json({
        success: false,
        message: customMessage || "Validation failed",
        errors: [],
      });
    }
  };
