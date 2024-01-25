import React, { Component } from "react";
import { IMAGE_URL } from "../../API/secrets";
import "./Movie.css";
import { API_URL, API_KEY } from "../../API/secrets";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

class Movie extends Component {
  state = {
    movieData: {},
    video: {},
    mouseOver: false,
    loader: true,
  };

  async componentDidMount() {
    //https://api.themoviedb.org/3/movie/550?api_key=d8af0c11dd67d6349c48da4ffc70b8b0
    let data = await axios.get(
      `${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`
    );
    let img = IMAGE_URL + data.data.poster_path;
    this.setState({
      movieData: { ...data.data, img },
    });
    this.setState({ loader: false });
  }
  playVideo = async (obj) => {
    let req = await axios.get(
      `${API_URL}/movie/${obj}/videos?api_key=${API_KEY}&language=en-US`
    );
    let videoObj = req.data.results;
    let v = videoObj.filter(function (video) {
      if (video.type === "Trailer" && video.site === "YouTube") {
        return true;
      } else return false;
    });
    this.setState({ video: v[0] });
  };

  render() {
    const opts = {
      height: "393",
      width: "393",
      playerVars: {
        autoplay: 1,
      },
    };

    let { poster_path, title, vote_average, id } = this.props.movie;
    if (this.state.loader)
      return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            <Skeleton
              height={350}
              count={this.state.movieData?.length}
              width={270}
              containerClassName={"skeleton"}
            />
          </p>
        </SkeletonTheme>
      );
    return (
      <div className="movie-item">
        <div className="movie-poster">
          <Link
            to={{
              pathname: "/moviepage",
              state: { ...this.state.movieData },
            }}
          >
            <img src={`${IMAGE_URL + poster_path || ""}`} alt="movieImg" />
            {/* {(this.state.mouseOver)&& (this.state.video)?<YouTube videoId={this.state.video.key} opts={opts} />:} */}
          </Link>
        </div>
        <div className="movie-info">
          <div className="movie-title">{title}</div>
          <div className="movie-rating">{vote_average} IMDB</div>
        </div>
      </div>
    );
  }
}

export default Movie;
