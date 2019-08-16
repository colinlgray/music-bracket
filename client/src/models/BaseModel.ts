import uuid from "uuid/v4";

export interface ModelProperties {
  id?: string;
}

export class BaseModel {
  constructor(props: ModelProperties) {
    this.id = props.id || uuid();
  }
  id: string;
}
