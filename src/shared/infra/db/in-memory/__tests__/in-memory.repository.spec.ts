import { Entity } from "../../../../domain/entity.js";
import { UUID } from "../../../../domain/value-objects/uuid.vo.js";
import { InMemoryRepository } from "../in-memory.repository.js";

type DummyEntityConstructorProps = {
  entity_id?: UUID;
  name: string;
  price: number;
};

class DummyEntity extends Entity {
  entity_id: UUID;
  name: string;
  price: number;

  constructor(props: DummyEntityConstructorProps) {
    super();
    this.entity_id = props.entity_id || new UUID();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class DummyInMemoryRepository extends InMemoryRepository<DummyEntity, UUID> {
  getEntity(): new (...args: any[]) => DummyEntity {
    return DummyEntity;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repository: DummyInMemoryRepository;

  beforeEach(() => {
    repository = new DummyInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new DummyEntity({ name: "Test", price: 100 });
    await repository.insert(entity);
    
    expect(repository.items).toHaveLength(1);
  });

  it("should insert multiple entities", async () => {
    const entities = [
      new DummyEntity({ name: "Test1", price: 100 }),
      new DummyEntity({ name: "Test2", price: 200 }),
    ];
    await repository.bulkInsert(entities);
    
    expect(repository.items).toHaveLength(2);
  });
  
  it("should get an entity by id", async () => {
    const entity = new DummyEntity({ name: "Test", price: 100 });
    await repository.insert(entity);
    
    const foundEntity = await repository.findById(entity.entity_id);
    expect(foundEntity).toEqual(entity);
  });

  it("should return null when entity not found by id", async () => {
    const foundEntity = await repository.findById(new UUID());
    expect(foundEntity).toBeNull();
  });

  it("should get all entities", async () => {
    const entities = [
      new DummyEntity({ name: "Test1", price: 100 }),
      new DummyEntity({ name: "Test2", price: 200 }),
    ];
    await repository.bulkInsert(entities);
    
    const allEntities = await repository.findAll();
    expect(allEntities).toHaveLength(2);
  });

  it("should update an existing entity", async () => {
    const entity = new DummyEntity({ name: "Test", price: 100 });
    await repository.insert(entity);
    
    entity.price = 150;
    await repository.update(entity);
    
    const updatedEntity = await repository.findById(entity.entity_id);
    expect(updatedEntity?.price).toBe(150);
  });

  it("should throw NotFoundError when updating non-existing entity", async () => {
    const entity = new DummyEntity({ name: "Test", price: 100 });
    
    await expect(repository.update(entity)).rejects.toThrow(
      `Entity "DummyEntity" with id(s) "${entity.entity_id.id}" not found.`
    );
  });

  it("should delete an existing entity", async () => {
    const entity = new DummyEntity({ name: "Test", price: 100 });
    await repository.insert(entity);
    
    await repository.delete(entity.entity_id);
    
    const foundEntity = await repository.findById(entity.entity_id);
    expect(foundEntity).toBeNull();
  });

  it("should throw NotFoundError when deleting non-existing entity", async () => {
    const nonExistingId = new UUID();
    
    await expect(repository.delete(nonExistingId)).rejects.toThrow(
      `Entity "DummyEntity" with id(s) "${nonExistingId.id}" not found.`
    );
  });
});
