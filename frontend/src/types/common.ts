import type { Theme } from "@emotion/react";

export type Rating = 1 | 2 | 3 | 4 | 5;
export type Gender = "female" | "male" | "non-binary" | "unspecified";
export type Role = "user" | "admin";
export type Bookshelf = "want to read" | "reading" | "read";
export type Format =
  | "hardcover"
  | "paperback"
  | "audiobook"
  | "ebook"
  | "large print";
export type Variant =
  | "h1"
  | "title"
  | "h2"
  | "h3"
  | "cardTitle"
  | "h4"
  | "body"
  | "footerTitle"
  | "credits"
  | "ctaSecondary"
  | "ctaTitle"
  | "searchTitle"
  | "legend"
  | "link"
  | "bodyItalic"
  | "authorName"
  | "review"
  | "editionTitle"
  | "avatarLegend";
export type ButtonVariant =
  | "submit"
  | "show"
  | "edit"
  | "search"
  | "remove"
  | "add"
  | "ghost"
  | "outline";
export type InputType = "text" | "search" | "email" | "password" | "number" | 'date';
export type Width = keyof Theme["sizes"];
export type Spacing = keyof Theme["spacing"];
export type BorderRadius = keyof Theme["radii"];
export type Breakpoint = keyof Theme["breakpoints"];
export type BadgeType = "genre" | "trope";
export type Colors = keyof Theme["colors"];
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type JustifyContent = 'center' | 'space-between' | 'start' | 'end';
export type AlignItems = 'center' | 'start' | 'end';
