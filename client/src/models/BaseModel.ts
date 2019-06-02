export interface BaseModel {
  save(): void;
  fetchOrCreate(id?: string): PromiseLike<any>;
  create(): PromiseLike<any>;
}
