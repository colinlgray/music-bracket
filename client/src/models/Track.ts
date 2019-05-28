export interface TrackProperties {
  [key: string]: any;
  duration: number;
  explicit: boolean;
  href: string;
  popularity: number;
  preview_url: string;
  spotifyId: string;
  type: string;
  uri: string;
  id: string;
}

export class Track {
  [key: string]: any;
  constructor(props: TrackProperties) {
    for (let key in props) {
      this[key] = props[key];
    }
  }

  save(): void {
    console.log("Would save the model here");
  }
}

export default Track;
