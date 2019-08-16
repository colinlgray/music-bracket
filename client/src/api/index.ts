import { get } from "../utils/http";
import pluralize from "pluralize";
import { BaseModel } from "../models";

export async function fetchAll(model: typeof BaseModel) {
  const { parsedBody } = await get(`/api/${asUrl(model.name)}`);
  return parsedBody;
}

export async function fetch(model: typeof BaseModel, id: string) {
  const { parsedBody } = await get(`/api/${asUrl(model.name)}/${id}`);
  return parsedBody;
}

export function asUrl(modelName: string): string {
  return pluralize.plural(modelName).toLowerCase();
}
