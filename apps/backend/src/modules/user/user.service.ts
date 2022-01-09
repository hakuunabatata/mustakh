import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserRepository } from '.';

@Injectable()
export class UserService {
  private repository = new UserRepository();

  async create({ name, email }: CreateUserDto) {
    const checkUser = await this.repository.findUserByName(name);

    if (checkUser)
      return {
        error: `User ${checkUser.name} already exists!`,
      };

    const user = await this.repository.createUser({ name, email });

    return {
      message: `User ${user.name} created`,
      user,
    };
  }

  async findAll() {
    const users = await this.repository.listUsers();

    return {
      message: `Listing all ${users.length} users`,
      users,
    };
  }

  async findOne(id: number) {
    const user = await this.repository.listUser(id);

    if (!user)
      return {
        message: `User #${id} dont exists`,
      };

    return {
      message: `Find user ${user.name}`,
      user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const checkUser = await this.repository.findUserById(id);

    if (!checkUser)
      return {
        message: `User #${id} dont exists`,
      };

    const user = await this.repository.updateUser(updateUserDto, id);

    return {
      message: `Update user ${user.name}`,
      user,
    };
  }

  async remove(id: number) {
    const checkUser = await this.repository.findUserById(id);

    if (!checkUser)
      return {
        message: `User #${id} dont exists`,
      };

    const user = await this.repository.deleteUser(id);

    return {
      message: `Delete user ${user.name}`,
      user,
    };
  }
}
