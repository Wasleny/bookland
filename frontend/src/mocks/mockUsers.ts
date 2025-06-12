import type { UserProps } from "../types/user";

export const mockUsers: UserProps[] = [
  {
    id: "user-1",
    name: "Alice Martins",
    nickname: "alice_readz",
    email: "alice@example.com",
    password: "password123",
    gender: "female",
    birthday: new Date("1993-06-14"),
    ratingCount: 52,
    reviewCount: 12,
    averageRating: 4.2,
    avatarUrl: "/images/avatars/alice_readz.svg",
    role: "admin",
  },
  {
    id: "user-2",
    name: "Bruno Oliveira",
    nickname: "brunobookworm",
    email: "bruno@example.com",
    password: "test456",
    gender: "male",
    birthday: new Date("1988-01-22"),
    ratingCount: 87,
    reviewCount: 20,
    averageRating: 3.8,
    avatarUrl: "/images/avatars/brunobookworm.svg",
    role: "user",
  },
];
