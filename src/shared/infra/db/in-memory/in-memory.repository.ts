import { Entity } from "../../../domain/entity.js";
import { NotFoundError } from "../../../domain/errors/not-found.error.js";
import { IRepository } from "../../../domain/repository/repository.interface.js";
import { ValueObject } from "../../../domain/value-object.js";

export abstract class InMemoryRepository<
  E extends Entity,
  EntityID extends ValueObject
> implements IRepository<E, EntityID>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.entity_id.equals(entity.entity_id)
    );
    if (itemIndex === -1) {
      throw new NotFoundError(entity.entity_id, this.getEntity());
    }
    this.items[itemIndex] = entity;
  }

  async delete(id: EntityID): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.entity_id.equals(id));
    if (itemIndex === -1) {
      throw new NotFoundError(id, this.getEntity());
    }
    this.items.splice(itemIndex, 1);
  }

  findById(id: EntityID): Promise<E | null> {
    const item = this.items.find((item) => item.entity_id.equals(id));
    if (!item) return null;
    return Promise.resolve(item);
  }

  findAll(): Promise<E[]> {
    return Promise.resolve(this.items);
  }

  abstract getEntity(): new (...args: any[]) => E;
}
