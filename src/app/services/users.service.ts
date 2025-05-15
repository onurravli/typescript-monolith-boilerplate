import type { CreateUserDto, UpdateUserDto } from "@/dtos";
import { CustomError } from "@/types";
import { prisma } from "@/utils";

class UsersService {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.getUserByUsername = this.getUserByUsername.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  public async createUser(data: CreateUserDto) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });
    if (existingUser) {
      throw new CustomError(409, "User already exists");
    }
    await prisma.user.create({
      data,
    });
  }
  public async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    return user;
  }
  public async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    return user;
  }
  public async getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    return user;
  }
  public async updateUser(id: string, data: UpdateUserDto) {
    const existingUser = await this.getUserById(id);
    if (!existingUser || existingUser.deletedAt) {
      throw new CustomError(404, "User not found");
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  }
  public async deleteUser(id: string) {
    const existingUser = await this.getUserById(id);
    if (!existingUser || existingUser.deletedAt) {
      throw new CustomError(404, "User not found");
    }
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

export default UsersService;
