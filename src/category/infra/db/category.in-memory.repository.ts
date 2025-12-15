import { UUID } from "../../../shared/domain/value-objects/uuid.vo.js";
import { InMemoryRepository } from "../../../shared/infra/db/in-memory/in-memory.repository.js";
import { Category } from "../../domain/category.entity.js";

export class CategoryInMemoryRepository extends InMemoryRepository<
  Category,
  UUID
> {
  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
