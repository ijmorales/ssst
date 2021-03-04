import { EntityManager } from "@mikro-orm/core";
import { Request } from "express";

export type MyContext = {
  req: Request;
  res: Response;
  em: EntityManager;
}