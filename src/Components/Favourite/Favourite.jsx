import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_URL, LOCAL_API_URL } from "../../API/secrets";
import Header from "../Header/Header";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Favourite.css";

class Favourite extends Component {
  state = {
    watchlist: [],
    movieInfo: [],
    movieImg: [],
    movieTitle: [],
    name: "",
    type: "",
    loader: true,
  };

  async componentDidMount() {
    await axios
      .get(`${LOCAL_API_URL}fav/`)

      .then((response) => {
        console.log("res: ", response.data);

        this.setState({ watchlist: response.data });
        this.setState({ loader: false });
      })
      .catch((error) => {
        console.log(error);
      });

    this.state.watchlist.map(async (e) => {
      console.log("e ", e);
      if (e.movid !== " ") {
        let req = await axios.get(
          `${API_URL}/movie/${e.movid}?api_key=${API_KEY}`
        );

        console.log("insdeiand", req);
        let img = IMAGE_URL + req.data.poster_path;
        if (req?.data) {
          req.data.type = "movie";
        }
        this.setState({
          movieInfo: [...this.state.movieInfo, req.data],
        });
        this.setState({ movieImg: [...this.state.movieImg, img] });
        this.setState({
          movieTitle: [...this.state.movieTitle, req.data.title],
        });
      } else {
        // https://api.themoviedb.org/3/tv/63174/videos?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US
        let req = await axios.get(`${API_URL}/tv/${e.tvid}?api_key=${API_KEY}`);
        let img = IMAGE_URL + req.data.poster_path;
        if (req?.data) {
          req.data.type = "tv";
        }
        this.setState({
          movieInfo: [...this.state.movieInfo, req.data],
        });
      }
      console.log("respose ", e);
    });
  }

  findMovie = async (name) => {
    let mainId = "";
    let id = "";

    this.state.watchlist.map((e) => {
      if (e.name === name) {
        mainId = e._id;
        id = e.tvid || e.movid;
      }
    });

    await axios
      .delete(`${LOCAL_API_URL}fav/` + mainId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    let arr = this.state.movieInfo.filter((movie) => {
      if (movie.id !== id) return true;
    });
    this.setState({ movieInfo: arr });
  };

  render() {
    return (
      <>
        <Header />
        <div className="movie-fav">
          <div className="fav-head">
            <h3 style={{ marginTop: "3%" }}>Your Favourites</h3>
          </div>

          {this.state.loader ? (
            <div style={{ marginLeft: '9vw', position: "relative" }}>
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>
                  <Skeleton
                    height={350}
                    count={5}
                    width={270}
                    containerClassName={"skeleton"}
                  />
                </p>
                <p>
                  <Skeleton
                    height={350}
                    count={5}
                    width={270}
                    containerClassName={"skeleton"}
                  />
                </p>
              </SkeletonTheme>
            </div>
          ) : (
            <div className="movie-card">
              {this.state.movieInfo.map((movie) => {
                return (
                  <div className="fav-card">
                    <div className="fav-img">
                      <Link
                        to={{
                          pathname: "/moviepage",
                          state: { ...movie },
                        }}
                      >
                        <img src={IMAGE_URL + movie.poster_path} alt="img" />
                      </Link>
                    </div>
                    <div className="fav-text">
                      <button
                        className="btn btn-dark my-button"
                        onClick={(e) => {
                          this.findMovie(movie.title || movie.name);
                        }}
                      >
                        Remove from list
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Favourite;
