import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/User';
import { hash, compare } from 'bcrypt';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  findByName(firstName: string, lastName: string) {
    return this.findOne({ firstName, lastName });
  }

  hashPassword(password: string) {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }

  validatePassword(inputPassword: string, password: string) {
    return compare(inputPassword, password);
  }
}
