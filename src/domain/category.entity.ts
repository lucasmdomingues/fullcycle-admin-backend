export type CategoryConstructorParams = {
  category_id?: string;
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
  category_id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(params: CategoryConstructorParams) {
    this.category_id = params.category_id ?? "";
    this.name = params.name;
    this.description = params.description ?? null;
    this.is_active = params.is_active ?? true;
    this.created_at = params.created_at ?? new Date();
  }

  static create(params: CategoryCreateCommand): Category {
    return new Category(params);
  }

  changeName(name: string): void {
    this.name = name;
  }

  changeDescription(description: string | null): void {
    this.description = description;
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
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
