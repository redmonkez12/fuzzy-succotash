import { UniqueId } from '#app/domain/value-objects/unique-id.vo';

export class ProductId extends UniqueId {
  constructor(id?: string) {
    super(id);
  }
}
