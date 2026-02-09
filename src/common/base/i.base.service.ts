import { DeleteResult, FindOneOptions, UpdateResult } from "typeorm"
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"

export interface IBaseService<T> {
  findAll(): Promise<T[]>
  findById(id: string, options?: FindOneOptions<T>): Promise<T| null>
  create(data: Partial<T>): Promise<T>
  update(criteria: number, partialEntity: QueryDeepPartialEntity<T>): Promise<UpdateResult>
  delete(id: string): Promise<DeleteResult>
}
