import pluralize from "pluralize";
import { omit } from "lodash";
import { get, post, put } from "../utils/http";
import { ModelName } from "../types";

export async function fetchAll(modelName: ModelName) {
  const { parsedBody } = await get(`/api/${asUrl(modelName)}`);
  return parsedBody;
}

export async function fetch(modelName: ModelName, id: string) {
  const { parsedBody } = await get(`/api/${asUrl(modelName)}/${id}`);
  return parsedBody;
}

export function asUrl(modelName: string): string {
  return pluralize.plural(modelName).toLowerCase();
}

export async function fetchOrCreate(modelName: ModelName, id?: string) {
  if (!id) {
    return create(modelName);
  }
  const { parsedBody } = await get(`/api/${asUrl(modelName)}/${id}`);
  return parsedBody;
}

export async function create(modelName: ModelName) {
  const { parsedBody } = await post(`/api/${asUrl(modelName)}`, {});
  return parsedBody;
}

export async function save(modelName: ModelName, data: any) {
  return await put(
    `/api/${asUrl(modelName)}/${encodeURI(data.id)}`,
    JSON.parse(JSON.stringify(omit(data, ["spotifyData"])))
  );
}