import { Repository, EntityRepository } from "typeorm";
import User from '../entities/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
}