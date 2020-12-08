import { lazy } from "react";

const routes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => {
       return import("../views/HomePage");
    }),
  },
  {
    path: "/movies",
    exact: true,
    component: lazy(() => {
      return import("../views/MoviesPage");
    }),
  },
  {
    path: "/movies/:movieId",
    exact: false,
    component: lazy(() => {
      return import("../views/MovieDetailsPage");
    }),
  },
  {
    path: "/movies/:movieId/review",
    exact: false,
    component: lazy(() => {
      return import("../views/MovieDetailsPage");
    }),
  },
  {
    path: "/movies/:movieId/cast",
    exact: false,
    component: lazy(() => {
      return import("../views/MovieDetailsPage");
    }),
  },
  {
    path: "",
    exact: false,
    component: lazy(() => {
      return import("../views/_404");
    }),
  }
];
export default routes;
