import { Database } from '@mustakh/prisma';
import { CreateUserDto, UpdateUserDto } from '.';

export class UserRepository {
  private repository = new Database().connect().user;

  findUserByName = async (name: string) =>
    this.repository.findFirst({ where: { name } });

  findUserById = async (id: number) =>
    this.repository.findFirst({ where: { id } });

  createUser = async (user: CreateUserDto) =>
    this.repository.create({ data: user });

  listUsers = async () => this.repository.findMany();

  listUser = async (id: number) =>
    this.repository.findUnique({ where: { id } });

  updateUser = async (user: UpdateUserDto, id: number) =>
    this.repository.update({ data: user, where: { id } });

  deleteUser = async (id: number) => this.repository.delete({ where: { id } });
}
