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

  createIcon(string) {
    let result = "";
    let strSplit = string.split(" ");
    if(strSplit.length > 1){
      result = strSplit[0][0] + strSplit[1][0];
    } else {
      result = strSplit[0][0]
    }
    return result.toUpperCase();
  }

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
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.location.search &&
      prevProps.location.search !== this.props.location.search
    ) {
      const query = new URLSearchParams(this.props.location.search).get(
        "query"
      );
      if (query) {
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
              <li className={styles.listItem} key={el.id} >
                <Link className={styles.listLink} to={`${routes.movies}/${el.id}`}>
                  <p className={styles.icon}><span>{this.createIcon(el.title)}</span></p>
                  <p className={styles.title}>{el.title}</p>
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
