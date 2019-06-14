import { get, post, put } from "../utils/http";
import pluralize from "pluralize";

export class BaseModel {
  constructor(props: any) {}
  static async fetchOrCreate(id?: string) {
    if (!id) {
      return this.create();
    }
    const { parsedBody } = await get(
      `/api/${pluralize.plural(this.constructor.name).toLowerCase()}/${id}`
    );
    return new this(parsedBody);
  }

  static async create() {
    const { parsedBody } = await post(
      `/api/${pluralize.plural(this.constructor.name).toLowerCase()}`,
      {}
    );
    return new this(parsedBody);
  }

  async save() {
    return await put(
      `/api/${pluralize.plural(this.constructor.name).toLowerCase()}`,
      JSON.parse(JSON.stringify(this))
    );
  }
}
