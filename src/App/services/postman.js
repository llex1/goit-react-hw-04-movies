import api from "../data/api";

const postman = function (object) {
  // console.log(object, "object from POSTMAN");
  let response = null;

  if (object) {
    const { movieId, marker, query } = object;

    if (marker && marker === "cast") {
      response = fetch(
        `${api.URI.details}${movieId}${api.URI.credits}?api_key=${api.key}`
      ).then((data) => data.json());
    } else if (marker && marker === "reviews") {
      response = fetch(
        `${api.URI.details}${movieId}${api.URI.reviews}?api_key=${api.key}`
      ).then((data) => data.json());
    } else if (marker && marker === "details") {
      response = fetch(
        `${api.URI.details}${movieId}?api_key=${api.key}`
      ).then((data) => data.json());
    } else if (marker && marker === "query") {
      response = fetch(
        `${api.URI.search}?api_key=${api.key}&query=${query}`
      ).then((data) => data.json());
    }
  } else {
    response = fetch(`${api.URI.trending}?api_key=${api.key}`).then((data) =>
      data.json()
    );
  }
  return response;
};

export default postman;
