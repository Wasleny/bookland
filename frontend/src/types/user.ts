import type { Gender, Role } from "./common";

export interface UserProps {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password?: string;
  gender?: Gender;
  birthday?: Date;
  ratingCount?: number; // Total ratings given by the user
  averageRating?: number; // Between 1 and 5
  reviewCount?: number; // Total reviews written by the user
  avatarUrl: string;
  role: Role
}
