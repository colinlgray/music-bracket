import pluralize from "pluralize";
import { omit } from "lodash";
import { get, put } from "../utils/http";
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

export async function save(modelName: ModelName, data: any) {
  return await put(
    `/api/${asUrl(modelName)}/${encodeURI(data.id)}`,
    JSON.parse(JSON.stringify(omit(data, ["spotifyData"])))
  );
}
