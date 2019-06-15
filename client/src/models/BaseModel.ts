import { get, post, put } from "../utils/http";
import pluralize from "pluralize";

export class BaseModel {
  constructor(props: any) {}

  static async fetchOrCreate(id?: string) {
    (window as any).asd = this;
    if (!id) {
      return this.create();
    }
    const { parsedBody } = await get(`/api/${this.pathName()}/${id}`);
    return new this(parsedBody);
  }

  static async create() {
    (window as any).asd = this;
    const { parsedBody } = await post(`/api/${this.pathName()}`, {});
    return new this(parsedBody);
  }

  static pathName() {
    return pluralize.plural(this.prototype.constructor.name).toLowerCase();
  }
  async save() {
    return await put(
      `/api/${BaseModel.pathName()}`,
      JSON.parse(JSON.stringify(this))
    );
  }
}
