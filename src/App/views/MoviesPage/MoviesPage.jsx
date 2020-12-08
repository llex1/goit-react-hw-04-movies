import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import postman from "../../services/postman";
import routes from "../../data/routes";

import styles from "./MoviesPage.module.css";

class MoviesPage extends Component {
  state = {
    form_value: "",
    results: [],
  };

  formControl = (event) => {
    this.setState((state) => {
      return {
        form_value: event.target.value,
      };
    });
  };

  formSubmit = async (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${event.target.form.search.value}`,
    });
  };

  async componentDidMount() {
    if (this.props.location.search) {
      const query = new URLSearchParams(this.props.location.search).get(
        "query"
      );
      const result = await postman({
        marker: "query",
        query: query,
      });
      this.setState((state) => {
        return {
          results: [...result.results],
        };
      });
      console.log(this.state.results);
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const query = new URLSearchParams(this.props.location.search).get(
        "query"
      );
      const result = await postman({
        marker: "query",
        query: query,
      });
      this.setState((state) => {
        return {
          results: [...result.results],
        };
      });
    }
  }

  render() {
    return (
      <Fragment>
        <form className={styles.searchForm} onSubmit={this.formSubmit}>
          <input
            className={styles.searchFormInput}
            name="search"
            type="text"
            placeholder="input movie name"
            value={this.state.form_value}
            onChange={this.formControl}
          />
          <input
            className={styles.searchFormButton}
            type="submit"
            value="search"
            onClick={this.formSubmit}
          />
        </form>
        <ul>
          {this.state.results.map((el) => {
            return (
              <li key={el.id}>
                <Link to={`${routes.movies}/${el.id}`}>
                  <p>
                    <span>A</span>
                    {el.title}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default MoviesPage;
