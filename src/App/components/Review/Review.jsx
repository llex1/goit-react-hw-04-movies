import React, { Component } from "react";
import postman from "../../services/postman";

class Review extends Component {
  state = {
    results: [],
  };

  async componentDidMount() {
    const result = await postman({
      movieId: this.props.movieId,
      marker: "reviews",
    });
    this.setState((state) => {
      return {
        results: [...result.results],
      };
    });
  }

  render() {
    return (
      <ul>
        {this.state.results.length ? (
          this.state.results.slice(0, 4).map((el) => {
            return (
              <li key={el.id}>
                <p>{el.author}</p>
                <p>{el.content}</p>
              </li>
            );
          })
        ) : (
          <li>We don't have any reviews for this movie</li>
        )}
      </ul>
    );
  }
}

export default Review;
