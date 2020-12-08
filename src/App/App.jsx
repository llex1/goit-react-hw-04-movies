// import React, { Component, Fragment } from "react";
import React, { Component, Fragment, Suspense } from "react";
// import { Route } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

//jsx components
import Header from "./components/Header";

//views
// import HomePage from "./views/HomePage";
// import MoviesPage from "./views/MoviesPage";
// import MovieDetailsPage from "./views/MovieDetailsPage";
// import _404 from "./views/_404";

//data
// import routes from "./data/routes";

//ASYNC views
import routes_ from "./data/routes_";

class App extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Header />

        <div className="container">
          <Suspense fallback={<h2>Loading...</h2>}>
            <Switch>
            {routes_.map((el, i) => {
              return (
                <Route
                key={i}
                path={el.path}
                exact={el.exact}
                component={el.component}
                />
                );
              })}
            </Switch>
          </Suspense>
        </div>

        {/* <div className="container">
          <Switch>
            <Route path={routes.home} exact component={HomePage} />
            <Route path={routes.movies} exact component={MoviesPage} />
            <Route
              path={`${routes.movies}${routes.movieId}`}
              component={MovieDetailsPage}
            />

            <Route component={_404} />
          </Switch>
        </div> */}

        {/* <Footer/> */}
      </Fragment>
    );
  }
}

export default App;
