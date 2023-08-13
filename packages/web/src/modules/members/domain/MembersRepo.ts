import { Member, MemberId } from "./member";

export type FindAllMembers = () => Member[] | undefined;

export type FindMemberById = (bookId: MemberId) => Member | null | undefined;

export type SaveMember = (bookId: MemberId) => void;
