import React, { Component } from "react";
import Movie from "../Movie/Movie.jsx";
import "./Movies.css";
class Movies extends Component {
  render() {
    return (
      <div className="movies">
        {this.props.movies.map((movieObj) => {
          return <Movie key={movieObj.id} movie={movieObj}></Movie>;
        })}
      </div>
    );
  }
}

export default Movies;
