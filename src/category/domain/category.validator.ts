import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields.js";
import { Category } from "./category.entity.js";

class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  constructor({ name, description, is_active }: Category) {
    Object.assign(this, { name, description, is_active });
  }
}

class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(entity: Category): boolean {
    return super.validate(new CategoryRules(entity));
  }
}

export class CategoryValidatorFactory {
  static create(): CategoryValidator {
    return new CategoryValidator();
  }
}
