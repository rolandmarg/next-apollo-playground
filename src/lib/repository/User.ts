import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { hash, compare } from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
