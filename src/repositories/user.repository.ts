import { PrismaClient } from '@prisma/client';
import { ICreateUserDto, IUpdateUserDto, IUser } from '../types';

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(skip: number, take: number): Promise<IUser[]> {
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: { username }
    });
  }

  async count(): Promise<number> {
    return this.prisma.user.count();
  }

  async create(data: ICreateUserDto): Promise<IUser> {
    return this.prisma.user.create({
      data
    });
  }

  async update(id: string, data: IUpdateUserDto): Promise<IUser> {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<IUser> {
    return this.prisma.user.delete({
      where: { id }
    });
  }

  async existsByUsername(username: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { username }
    });
    return count > 0;
  }

  async existsByUsernameExcludingId(username: string, excludeId: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: {
        username,
        id: { not: excludeId }
      }
    });
    return count > 0;
  }
}