import { CustomRepository } from '../../common/typeorm/typeorm-ex.decorator';
import { Property } from '../../database/entities/property.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetPropertiesQueryDto } from '../propety/dto/property.dto';

@CustomRepository(Property)
export class PropertyRepository extends Repository<Property> {
  buildListQuery(query: GetPropertiesQueryDto): SelectQueryBuilder<Property> {
    const qb = this.createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .loadRelationCountAndMap('property.reviewsCount', 'property.reviews');

    if (query.search) {
      qb.andWhere(
        '(LOWER(property.title) LIKE LOWER(:search) OR LOWER(property.location) LIKE LOWER(:search))',
        { search: `%${query.search}%` },
      );
    }

    if (query.type) {
      qb.andWhere('property.type = :type', { type: query.type });
    }

    if (query.minPrice !== undefined) {
      qb.andWhere('property.price >= :minPrice', { minPrice: query.minPrice });
    }

    if (query.maxPrice !== undefined) {
      qb.andWhere('property.price <= :maxPrice', { maxPrice: query.maxPrice });
    }

    switch (query.sort) {
      case 'price':
        qb.orderBy('property.price', query.order);
        break;
      case 'rating':
        qb.orderBy('property.rating', query.order);
        break;
      case 'latest':
      default:
        qb.orderBy('property.createdOnDate', query.order);
        break;
    }

    return qb;
  }

  async findAll(query: GetPropertiesQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const [items, total] = await this.buildListQuery(query)
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number) {
    return this.findOne({
      where: { id },
      relations: ['owner'],
      loadRelationIds: false,
    });
  }

  async deleteById(id: number) {
    return this.delete(id);
  }
}
