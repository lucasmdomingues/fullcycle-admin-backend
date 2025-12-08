import { ValidationEntityError } from "../../shared/domain/validators/validation.error.js";
import { UUID } from "../../shared/domain/value-objects/uuid.vo.js";
import { CategoryValidatorFactory } from "./category.validator.js";

export type CategoryConstructorParams = {
  category_id?: UUID;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class Category {
  category_id: UUID;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(params: CategoryConstructorParams) {
    this.category_id = params.category_id ?? new UUID();
    this.name = params.name;
    this.description = params.description ?? null;
    this.is_active = params.is_active ?? true;
    this.created_at = params.created_at ?? new Date();
  }

  static create(params: CategoryCreateCommand): Category {
    const category = new Category(params);
    Category.validate(category);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string | null): void {
    this.description = description;
    Category.validate(this);
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  }

  static validate(entity: Category): void {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) throw new ValidationEntityError(validator.errors);
  }

  toJSON() {
    return {
      category_id: this.category_id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
