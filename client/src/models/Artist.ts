import { BaseModel } from "./BaseModel";

export interface ArtistProperties {
  [key: string]: any;
  id: string;
  href: string;
  name: string;
  type: string;
  uri: string;
}

export class Artist extends BaseModel {
  [key: string]: any;
  id: string;
  href: string;
  name: string;
  type: string;
  uri: string;
  constructor(props: ArtistProperties) {
    super(props);
    this.id = props.id;
    this.href = props.href;
    this.name = props.name;
    this.type = props.type;
    this.uri = props.uri;
  }
}

export default Artist;
