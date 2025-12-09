import { ValueObject } from "./value-object.js";

export abstract class Entity {
    abstract get entity_id(): ValueObject;
    abstract toJSON(): any;
}