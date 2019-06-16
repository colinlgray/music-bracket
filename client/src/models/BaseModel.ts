import { get, post, put } from "../utils/http";
import pluralize from "pluralize";
import uuid from "uuid/v4";

export interface ModelProperties {
  id?: string;
}

export class BaseModel {
  constructor(props: ModelProperties) {
    this.id = props.id || uuid();
  }
  id: string;

  static async fetchOrCreate(id?: string) {
    if (!id) {
      return this.create();
    }
    const { parsedBody } = await get(
      `/api/${this.asUrl(this.prototype.constructor.name)}/${id}`
    );
    return new this(parsedBody);
  }

  static async create() {
    const { parsedBody } = await post(
      `/api/${this.asUrl(this.prototype.constructor.name)}`,
      {}
    );
    return new this(parsedBody);
  }

  static asUrl(modelName: string): string {
    return pluralize.plural(modelName).toLowerCase();
  }

  async save() {
    return await put(
      `/api/${BaseModel.asUrl(this.constructor.name)}/${encodeURI(this.id)}`,
      JSON.parse(JSON.stringify(this))
    );
  }
}
