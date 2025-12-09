import { IRepository } from "../../shared/domain/repository/repository.interface.js";
import { UUID } from "../../shared/domain/value-objects/uuid.vo.js";
import { Category } from "./category.entity.js";

export interface ICategoryRepository extends IRepository<Category, UUID> {}
