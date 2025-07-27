import type { UserApi, UserProps } from "../../types/user";

export function mapUserFromApi(data: UserApi): UserProps {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    nickname: data.nickname,
    avatarUrl: data.avatar_url,
    role: data.role,
    gender: data.gender,
    birthdate: data.birthdate ? new Date(data.birthdate.replace(/Z$/, "")) : undefined,
    ratingsCount: data.ratings_count,
    averageRating: data.average_rating,
    reviewsCount: data.reviews_count,
    age: data.age,
  };
}

export function mapUserToApi(data: UserProps): UserApi {
  return {
    id: "",
    name: data.name,
    nickname: data.nickname,
    email: data.email,
    password: data.password,
    gender: data.gender,
    birthdate: data.birthdate?.toISOString(),
    avatar_url: data.avatarUrl,
    role: "user",
  };
}
