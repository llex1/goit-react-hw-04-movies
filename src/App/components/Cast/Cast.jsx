import React, { Component } from "react";
import postman from "../../services/postman";
import api from "../../data/api";

class Cast extends Component {
  state = {
    results: [],
  };

  async componentDidMount() {
    const result = await postman({
      movieId: this.props.movieId,
      marker: "cast",
    });
    this.setState((state) => {
      return {
        results: [...result.cast],
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
                <img src={`${api.URI.img}${el.profile_path}`} alt={el.name} />
                <p>{el.name}</p>
                <p>{el.character}</p>
              </li>
            );
          })
        ) : (
          <li>sorry i can't find the cast for this movie</li>
        )}
      </ul>
    );
  }
}

export default Cast;
