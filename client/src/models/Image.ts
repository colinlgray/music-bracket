export interface ImageProperties {
  [key: string]: any;
  uri: string;
  width: number;
  height: number;
}

export class Image implements ImageProperties {
  [key: string]: any;
  uri: string;
  width: number;
  height: number;
  constructor(props: ImageProperties) {
    this.uri = props.uri;
    this.width = props.width;
    this.height = props.height;
  }
}

export default Image;
