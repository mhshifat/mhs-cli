import { Request, Response } from "express";
import packageJSON from "../../package.json";

export const rootRoute = (_: Request, res: Response) => {
  return res.status(200).json({
    name: packageJSON["name"],
    version: packageJSON["version"],
    description: packageJSON["description"],
  });
};
