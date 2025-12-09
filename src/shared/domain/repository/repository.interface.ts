import { Entity } from "../entity.js";
import { ValueObject } from "../value-object.js";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
    insert(entity: E): Promise<void>;
    bulkInsert(entities: E[]): Promise<void>;
    update(entity: E): Promise<void>;
    delete(id: EntityId): Promise<void>;
    findById(id: EntityId): Promise<E>;
    findAll(): Promise<E[]>;
    getEntity(): new (...args: any[]) => E;
}