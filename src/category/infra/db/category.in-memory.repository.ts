import { SortDirection } from "../../../shared/domain/repository/search-params.js";
import { UUID } from "../../../shared/domain/value-objects/uuid.vo.js";
import { InMemorySearchableRepository } from "../../../shared/infra/db/in-memory/in-memory.repository.js";
import { Category } from "../../domain/category.entity.js";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<
  Category,
  UUID
> {
  sortableFields: string[]= ['name', 'created_at'];

  protected async applyFilter(items: Category[], filter: string): Promise<Category[]> {
    if (!filter) {
      return Promise.resolve(items);
    }
    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().includes(filter.toLowerCase());
    });
    return Promise.resolve(filteredItems);
  }

  protected  applySort(items: Category[], sort: string | null, sort_dir: SortDirection | null): Category[] {
    return sort ? super.applySort(items, sort, sort_dir) : super.applySort(items, 'name', 'desc');
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
