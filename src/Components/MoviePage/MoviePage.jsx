import axios from "axios";
import React, { Component } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../API/secrets";
import YouTube from "react-youtube";
import "./MoviePage.css";
import Header from "../Header/Header";

const opts = {
  height: "900",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

class MoviePage extends Component {
  state = {
    videoObj: {},
  };

  async componentDidMount() {
    //https://api.themoviedb.org/3/movie/500/videos?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US
    let { id = "", type = "movie" } = this.props.location.state;
    let req = await axios.get(
      `${API_URL}${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    let videoObj = req.data.results;

    let v = videoObj.filter(function (video) {
      if (video.type === "Trailer" && video.site === "YouTube") {
        return true;
      } else return false;
    });
    this.setState({ videoObj: v[0] });
  }

  render() {
    console.log("my query data22", this.props.location);
    let {
      title,
      tagline,
      vote_average,
      overview,
      poster_path: posterPath = "",
      name = "",
      videoLink = "",
    } = this.props.location.state || "";
    const finalImg = IMAGE_URL + posterPath;
    return (
      <div className="movie-page">
        <Header />
        <div className="movie-poster">
          <img src={finalImg} alt="image" />
        </div>
        <div className="movie-page-details">
          <div className="movie-title-info">
            <h1>{title || name} </h1>
            <span style={{ color: "#DB202C" }}> {vote_average} IMDB</span>
            <br></br>
            <span>{tagline}</span>
            <p>{overview}</p>
            <YouTube
              videoId={videoLink || this.state.videoObj?.key}
              opts={opts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MoviePage;
