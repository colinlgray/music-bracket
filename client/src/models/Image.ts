export interface ImageProperties {
  [key: string]: any;
  url: string;
  width: number;
  height: number;
}

export class Image implements ImageProperties {
  [key: string]: any;
  url: string;
  width: number;
  height: number;
  constructor(props: ImageProperties) {
    this.url = props.url;
    this.width = props.width;
    this.height = props.height;
  }
}

export default Image;
