import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import api from "../../data/api";
import routes from "../../data/routes";
import postman from "../../services/postman"; // виконує листування з сервером

import Cast from "../../components/Cast";
import Review from "../../components/Review";

import styles from "./MovieDetailsPage.module.css";

class MovieDetailsPage extends Component {
  state = {
    isCast: false,
    cast_path: "cast",
    isReviews: false,
    reviews_path: "reviews",
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const result = await postman({ movieId: movieId, marker: "details" });
    this.setState((state) => {
      return {
        id: movieId,
        img: result.poster_path,
        title: result.title,
        raiting: result.vote_average,
        overview: result.overview,
        genres: result.genres,
        year: result.release_date,
      };
    });
  }

  componentDidUpdate() {
    const value = this.props.location.pathname.split("/");
    if (value.includes(this.state.cast_path) && !this.state.isCast) {
      this.setState((state) => {
        return {
          isCast: true,
          isReviews: false,
        };
      });
    } else if (value.includes(this.state.reviews_path) && !this.state.isReviews) {
      this.setState((state) => {
        return {
          isCast: false,
          isReviews: true,
        };
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className={styles.detail}>
          <img
            src={this.state.img && `${api.URI.img}${this.state.img}`} //пропуск при першому рендері
            alt={`${this.state.title}`}
            className={styles.detailImg}
          />
          <div>
            <p className={styles.title}>
              {this.state.title} (
              {this.state.year && this.state.year.slice(0, 4)})
            </p>
            <p className={styles.accent}> User Score: {this.state.raiting}</p>

            <p className={styles.accent}>Overview</p>
            <p>{this.state.overview}</p>

            <p className={styles.accent}>Genres</p>
            <p>
              {this.state.genres &&
                this.state.genres.map((el) => {
                  return `${el.name} `;
                })}
            </p>
          </div>
        </div>
        <div>
          <hr />
          <ul className={styles.addInfoList}>
            <li>
              <Link
                className={styles.addInfoListItem}
                to={`${routes.movies}/${this.state.id}/${this.state.cast_path}`}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                className={styles.addInfoListItem}
                to={`${routes.movies}/${this.state.id}/${this.state.reviews_path}`}
              >
                Review
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {this.state.isCast && <Cast movieId={this.state.id} />}
          {this.state.isReviews && <Review movieId={this.state.id} />}
        </div>
      </Fragment>
    );
  }
}

export default MovieDetailsPage;
