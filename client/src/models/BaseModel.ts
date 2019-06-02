export class BaseModel {
  save(): void {
    console.log("Would save the model here");
  }
  fetchOrCreate(id) {}
}

export default BaseModel;
