import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { IBaseService } from './i.base.service';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<T, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: string, options?: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne({
      ...options,
      where: { id } as any,
    });
  }

  async create(item): Promise<T> {
    return await this.repository.save(item);
  }

  async update(
    criteria: number | string | string[] | number[],
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return await this.repository.update(criteria, partialEntity);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
