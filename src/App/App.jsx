import React, { Component, Fragment} from "react";
// import React, { Component, Fragment, lazy, Suspense} from "react";
import { Route, Switch } from "react-router-dom";

//jsx components
import Header from "./components/Header";

//views
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import _404 from "./views/_404";

//data
import routes from "./data/routes";

//ASYNC views
// const AsyncMoviesPage = lazy(()=>{import('./views/MoviesPage')});
// const AsyncMovieDetailsPage = lazy(()=>{import('./views/MovieDetailsPage')});

class App extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Header />

        <div className="container">
            <Switch>
              <Route path={routes.home} exact component={HomePage} />
              <Route path={routes.movies} exact component={MoviesPage} />
              <Route
                path={`${routes.movies}${routes.movieId}`} 
                component={MovieDetailsPage}
              />
              {/* <Suspense fallback={<h2>Loading...</h2>}>
                <Route path={routes.movies} exact component={AsyncMoviesPage} />
                <Route
                  path={`${routes.movies}${routes.movieId}`} 
                  component={AsyncMovieDetailsPage}
                />
              </Suspense> */}
              <Route component={_404} />
            </Switch>
        </div>

        {/* <Footer/> */}
      </Fragment>
    );
  }
}

export default App;
