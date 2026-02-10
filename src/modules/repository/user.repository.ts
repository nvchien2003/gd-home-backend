import { CustomRepository } from '../../common/typeorm/typeorm-ex.decorator';
import { User } from '../../database/entities/user.entity';

import { Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  findByEmailWithPassword(email: string) {
    return this.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }
}
