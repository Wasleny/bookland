import type { ReviewProps } from "../types/review";
import {mockBooks} from "./mockBooks";
import { mockRatingCriteria } from "./mockRatingCriteria";
import { mockUsers } from "./mockUsers";

export const mockReviews: ReviewProps[] = [
  {
    id: "review-1",
    user: mockUsers[0],
    book: mockBooks[29],
    rating: 5,
    createdAt: new Date(2025, 6, 5),
    mostRecentReading: true,
  },
  {
    id: "review-2",
    user: mockUsers[0],
    book: mockBooks[11],
    rating: 3,
    startDate: { day: "05", month: "04", year: "2025" },
    endDate: { day: "31", month: "05", year: "2025" },
    ratingCompositionCriteria: [
      {
        criterion: mockRatingCriteria[0],
        rating: 3,
      },
      {
        criterion: mockRatingCriteria[1],
        rating: 4,
      },
    ],
    independentRatingCriteria: [
      {
        criterion: mockRatingCriteria[2],
        rating: 5,
      },
    ],
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in felis sodales, tincidunt mauris tristique, laoreet magna. Suspendisse potenti. Curabitur congue at ipsum ut rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed eleifend ipsum, ut tristique mi. Pellentesque fringilla, risus nec vulputate suscipit, sapien erat sollicitudin tellus, dignissim mollis nunc ipsum quis tortor. Nullam hendrerit arcu leo, ut malesuada turpis dictum vitae. Donec molestie euismod lacus vitae dapibus. Sed ultrices sit amet nulla a tempus. Praesent sed vehicula metus, nec porttitor metus. Aenean dignissim tincidunt aliquet. Fusce magna tellus, euismod sit amet magna eleifend, condimentum molestie nisl. Vivamus consectetur massa sit amet lacus laoreet, sed tempor enim tempus. Proin cursus, ligula vitae luctus feugiat, mi neque tincidunt enim, quis pulvinar quam neque non ex. Fusce vitae nunc sit amet quam aliquet gravida nec eu dui. Ut eget elementum enim, ut egestas neque. Aliquam nec dolor non leo hendrerit condimentum. Maecenas eget dui in diam vulputate placerat. Aliquam pellentesque, massa vitae mattis dictum, neque quam consectetur ipsum, id tincidunt enim nisi fermentum mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in felis sodales, tincidunt mauris tristique, laoreet magna. Suspendisse potenti. Curabitur congue at ipsum ut rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed eleifend ipsum, ut tristique mi. Pellentesque fringilla, risus nec vulputate suscipit, sapien erat sollicitudin tellus, dignissim mollis nunc ipsum quis tortor. Nullam hendrerit arcu leo, ut malesuada turpis dictum vitae. Donec molestie euismod lacus vitae dapibus. Sed ultrices sit amet nulla a tempus. Praesent sed vehicula metus, nec porttitor metus. Aenean dignissim tincidunt aliquet. Fusce magna tellus, euismod sit amet magna eleifend, condimentum molestie nisl. Vivamus consectetur massa sit amet lacus laoreet, sed tempor enim tempus. Proin cursus, ligula vitae luctus feugiat, mi neque tincidunt enim, quis pulvinar quam neque non ex. Fusce vitae nunc sit amet quam aliquet gravida nec eu dui. Ut eget elementum enim, ut egestas neque. Aliquam nec dolor non leo hendrerit condimentum. Maecenas eget dui in diam vulputate placerat. Aliquam pellentesque, massa vitae mattis dictum, neque quam consectetur ipsum, id tincidunt enim nisi fermentum mauris.",
    createdAt: new Date(2025, 6, 5),
    mostRecentReading: true,
  },
  {
    id: "review-3",
    user: mockUsers[1],
    book: { ...mockBooks[11] },
    rating: 5,
    createdAt: new Date(2023, 1, 10),
    body: "Donec sit amet ex ultrices, vehicula velit nec, hendrerit ligula. Ut eget nunc eget ante mattis efficitur. Aenean aliquam faucibus lectus ac scelerisque. Nullam sed tortor consectetur, viverra tortor condimentum, pretium tortor. Nullam nulla nunc, accumsan et tortor at, rhoncus tincidunt erat. Donec odio ante, porta sagittis eros id, pulvinar pretium purus. Phasellus tristique nulla id nibh cursus, vitae mollis enim malesuada. Sed vehicula nulla massa, sed luctus orci scelerisque sed. Nunc ornare lectus nibh, ac volutpat tellus eleifend in. Fusce non sapien eget turpis bibendum semper eu quis massa. Aliquam pharetra lectus dolor, quis cursus velit pellentesque nec. Duis tincidunt varius vehicula. Cras rhoncus mauris nec lorem convallis, eu tincidunt neque porttitor. Vivamus dapibus id turpis viverra vestibulum.",
    mostRecentReading: true,
  },
];
