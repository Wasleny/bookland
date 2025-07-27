import type { Gender, Role } from "./common";

export interface UserProps {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password?: string;
  gender?: Gender;
  age?: number; // Age in years
  birthdate?: Date; // ISO date string
  ratingsCount?: number; // Total ratings given by the user
  averageRating?: number; // Between 1 and 5
  reviewsCount?: number; // Total reviews written by the user
  avatarUrl: string;
  role: Role
}

export interface UserApi {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password?: string;
  gender?: Gender;
  age?: number; // Age in years
  birthdate?: string; // ISO date string
  ratings_count?: number; // Total ratings given by the user
  average_rating?: number; // Between 1 and 5
  reviews_count?: number; // Total reviews written by the user
  avatar_url: string;
  role: Role
}