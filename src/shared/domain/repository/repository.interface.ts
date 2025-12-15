import { Entity } from "../entity.js";
import { ValueObject } from "../value-object.js";
import { SearchParams } from "./search-params.js";
import { SearchResult } from "./search-result.js";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(id: EntityId): Promise<void>;
  findById(id: EntityId): Promise<E | null>;
  findAll(): Promise<E[]>;
  getEntity(): new (...args: any[]) => E;
}

export interface ISearchableRepository<
  E extends Entity,
  EntityID extends ValueObject,
  SearchInput = SearchParams,
  SearchOutput = SearchResult
> extends IRepository<E, EntityID> {
  sortableFields: string[];

  search(props: SearchInput): Promise<SearchOutput>;
}
