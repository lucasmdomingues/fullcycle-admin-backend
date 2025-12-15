import { Entity } from "../entity.js";

export class NotFoundError extends Error {
  constructor(id: any[] | any, entityClass: new (...args: any[]) => Entity) {
    const messageIDs = Array.isArray(id) ? id.join(", ") : id;
    super(`Entity "${entityClass.name}" with id(s) "${messageIDs}" not found.`);
    this.name = "NotFoundError";
  }
}
