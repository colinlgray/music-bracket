import pluralize from "pluralize";
import { omit } from "lodash";
import { get, post, put } from "../utils/http";
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

export async function fetchOrCreate(model: typeof BaseModel, id?: string) {
  if (!id) {
    return create(model);
  }
  const { parsedBody } = await get(`/api/${asUrl(model.name)}/${id}`);
  return new model(parsedBody);
}

export async function create(model: typeof BaseModel) {
  const { parsedBody } = await post(`/api/${asUrl(model.name)}`, {});
  return new model(parsedBody);
}

export async function save(model: typeof BaseModel, data: any) {
  return await put(
    `/api/${asUrl(model.name)}/${encodeURI(data.id)}`,
    JSON.parse(JSON.stringify(omit(data, ["spotifyData"])))
  );
}
