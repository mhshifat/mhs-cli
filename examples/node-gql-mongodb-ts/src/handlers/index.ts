import { ContextParameters } from "graphql-yoga/dist/types";
import models from "../models";

export interface IContext {
  models;
}

export const contextHandler = ({
  request,
  response,
}: ContextParameters): IContext => ({
  models,
});
