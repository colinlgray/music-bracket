export interface BracketProperties {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  creator: string;
}

export class Bracket {
  [key: string]: any;
  constructor(props: BracketProperties) {
    for (let key in props) {
      this[key] = props[key];
    }
  }

  save(): void {
    console.log("Would save the model here");
  }
}

export default Bracket;
