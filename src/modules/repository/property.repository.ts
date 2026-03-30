import { CustomRepository } from '../../common/typeorm/typeorm-ex.decorator';
import { Property } from '../../database/entities/property.entity';
import { Repository } from 'typeorm';

@CustomRepository(Property)
export class PropertyRepository extends Repository<Property> {
  async findAll() {
    return this.find({
      relations: ['images', 'amenities'],
    });
  }

  async findById(id: string) {
    return this.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  async delete(id: string) {
    return this.delete(id);
  }
}
