import Book from "../pages/Book";
import Criteria from "../pages/Criteria";
import Home from "../pages/Home";
import RatingBook from "../pages/RatingBook";
import Search from "../pages/Search";

export const appRoutes = [
  {
    path: "/",
    children: [{ index: true, element: <Home /> },
      { path: 'book/:id', element: <Book /> },
      { path: 'search/', element: <Search /> },
      { path: 'rating-criteria/', element: <Criteria /> },
      { path: 'rating-book/:id', element: <RatingBook /> },
    ],
  },
];
