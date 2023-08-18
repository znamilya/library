import { Either, left, right } from "@sweet-monads/either";
import { Member } from "../../../domain/entities/Member";
import { IMembersRepo } from "../../../domain/repos/IMembersRepo";
import { PrismaRepo } from "./PrismaRepo";
import { MembersMapper } from "../../../mappers/Members";
import { EntityNotFoundException } from "../../../shared";

class PrismaMembersRepo extends PrismaRepo implements IMembersRepo {
  async findAll() {
    try {
      const members = await this.prisma.member.findMany({
        include: {
          borrowings: {
            select: {
              id: true,
            },
          },
        },
      });

      return right(members.map(MembersMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findById(memberId: string) {
    try {
      const member = await this.prisma.member.findUnique({
        where: {
          id: memberId,
        },
        include: {
          borrowings: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!member) {
        return left(new EntityNotFoundException("Member"));
      }

      return right(MembersMapper.persistenceToEntity(member));
    } catch (error) {
      return left(this.handleError(error));
    }
  }
}

export { PrismaMembersRepo };
