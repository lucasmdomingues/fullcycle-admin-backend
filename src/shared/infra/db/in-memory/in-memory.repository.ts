import { Entity } from "../../../domain/entity.js";
import { NotFoundError } from "../../../domain/errors/not-found.error.js";
import {
  IRepository,
  ISearchableRepository,
} from "../../../domain/repository/repository.interface.js";
import { SearchParams, SortDirection } from "../../../domain/repository/search-params.js";
import { SearchResult } from "../../../domain/repository/search-result.js";
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

export abstract class InMemorySearchableRepository<
    E extends Entity,
    EntityID extends ValueObject,
    Filter = string
  >
  extends InMemoryRepository<E, EntityID>
  implements ISearchableRepository<E, EntityID, Filter>
{
  sortableFields: string[] = [];

  async search(props: SearchParams<Filter>): Promise<SearchResult<E>> {
    const filteredItems = await this.applyFilter(this.items, props.filter);

    const sortedItems = this.applySort(
      filteredItems,
      props.sort,
      props.sort_dir
    );
    
    const paginatedItems = this.applyPagination(
      sortedItems,
      props.page,
      props.per_page
    );
    
    return new SearchResult({
      items: paginatedItems,
      total: filteredItems.length,
      current_page: props.page,
      per_page: props.per_page,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: Filter | null
  ): Promise<E[]>;

  protected applyPagination(items: E[], page: SearchParams['page'], per_page: SearchParams['per_page']): E[] {
    const start = (page - 1) * per_page;
    const limit = start + per_page;
    return items.slice(start, limit);
  }

  protected applySort(items: E[], sort: string | null, sort_dir: SortDirection | null, custom_getter?: (sort: string, item: E) => any): E[] {
    if (!sort) {
      return items;
    }
    return [...items].sort((a, b) => {
      const aValue = custom_getter ? custom_getter(sort, a) : (a as any)[sort];
      const bValue = custom_getter ? custom_getter(sort, b) : (b as any)[sort];
      if (aValue < bValue) {
        return sort_dir === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sort_dir === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
