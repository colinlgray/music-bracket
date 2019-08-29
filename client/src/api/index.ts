import pluralize from "pluralize";
import { omit } from "lodash";
import { put } from "../utils/http";
import { ModelName } from "../types";

export function asUrl(modelName: string): string {
  return pluralize.plural(modelName).toLowerCase();
}

export async function save(modelName: ModelName, data: any) {
  return await put(
    `/api/${asUrl(modelName)}/${encodeURI(data.id)}`,
    JSON.parse(JSON.stringify(omit(data, ["spotifyData"])))
  );
}
