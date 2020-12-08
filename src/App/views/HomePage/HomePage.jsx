import React, { Component } from "react";
import { Link } from "react-router-dom";
import postman from "../../services/postman"; // виконує листування з сервером
import api from "../../data/api"; // містить посилання на сервер з фото
import routes from "../../data/routes";
import styles from "./HomePage.module.css";

class HomePage extends Component {
  state = {
    results: [],
  };

  async componentDidMount() {
    const { results } = await postman();
    this.setState((state) => {
      return {
        results: [...results],
      };
    });
  }

  render() {
    return (
      <ul className={styles.homeList}>
        {this.state.results.map((el) => {
          return (
            <li key={`${el.id}`} className={styles.homeListItem}>
              <Link to={`${routes.movies}/${el.id}`}>
                <img
                  className={styles.homeListImg}
                  src={`${api.URI.img}${el.backdrop_path}`}
                  alt={`${el.original_title}`}
                />
                <span
                  className={styles.homeListTitle}
                >{`${el.original_title}`}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default HomePage;
