import axios from "axios";
import { API_KEY, API_URL, IMAGE_URL } from "../../API/secrets";
import React, { Component } from "react";
import "./NetflixHome.css";
import Carousel from "react-multi-carousel";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Favourite from "../Favourite/Favourite";
import Header from "../Header/Header";
import YouTube from "react-youtube";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    slidesToSlide: 2,
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    slidesToSlide: 2,
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    slidesToSlide: 2,
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    slidesToSlide: 2,
    items: 1,
  },
};

const opts = {
  height: "290",
  width: "100",
  playerVars: {
    autoplay: 1,
  },
};

class NetflixHome extends Component {
  state = {
    movieInfo: {},
    image: "",
    popularMovie: [],
    latestMovie: [],
    topRated: [],
    trending: [],
    netflix: [],
    tv: [],
    isModalOpen: false,
    currMovie: "",
    currImg: "",
    currInfo: "",
    currId: "",
    currTvid: "",
    currTv: "",
    videoObj: {},
    movieRating: "",
    genre: "",
    watchlist: {},
    watch: false,
    dbId: [{}],
    tvInfo: "",
    vidObj: {},
  };
  //

  async componentDidMount() {
    //https://api.themoviedb.org/3/movie/latest?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US

    // let latestData=await axios.get(`${API_URL}movie/latest?api_key=${API_KEY}&language=en-US`);
    // let use=latestData.data;
    // let img=IMAGE_URL+use.poster_path;

    //https://api.themoviedb.org/3/movie/popular?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US&page=1
    let popular = await axios.get(
      `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    let popArr = [...popular.data.results];
    this.setState({ popularMovie: popArr });

    //  https://api.themoviedb.org/3/movie/top_rated?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US&page=1
    let topRated = await axios.get(
      `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    let top = topRated.data.results;
    this.setState({ topRated: top });

    //https://api.themoviedb.org/3/movie/latest?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US
    let latest = await axios.get(
      `${API_URL}movie/latest?api_key=${API_KEY}&language=en-US`
    );

    //https://api.themoviedb.org/3/movie/588228/watch/providers?api_key=d8af0c11dd67d6349c48da4ffc70b8b0
    //https://api.themoviedb.org/3/watch/providers/tv?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US

    //https://api.themoviedb.org/3/trending/all/day?api_key=d8af0c11dd67d6349c48da4ffc70b8b0
    let trending = await axios.get(
      `${API_URL}trending/all/day?api_key=${API_KEY}`
    );
    let trend = trending.data.results;
    let tend = trending.data.results[0];
    let now = trending.data.results[0];
    this.setState({ trending: trend });

    //https://api.themoviedb.org/3/tv/on_the_air?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US&page=1
    //let tv=await axios.get(`${API_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`)
    let tv = await axios.get(
      `${API_URL}discover/tv?api_key=${API_KEY}&with_networks=213`
    );
    console.log(tv.data);
    let tvid = tv.data.results.slice(0, 10);
    let im = IMAGE_URL + tv.data.results[1].poster_path;
    let movieIn = tv.data.results[1];
    this.setState({ tv: tvid });
    console.log(im);
    this.setState({ image: im, tvInfo: movieIn });
    //https://api.themoviedb.org/3/tv/123190/watch/providers?api_key=d8af0c11dd67d6349c48da4ffc70b8b0

    //https://api.themoviedb.org/3/tv/60625/external_ids?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US
    console.log("hee");
  }

  async playVideo() {
    console.log("tc", this.state.currTvid);
    if (!this.state.currId && this.state.currTvid) {
      let req = await axios.get(
        `${API_URL}tv/${this.state.currTvid}/videos?api_key=${API_KEY}&language=en-US`
      );

      this.setState({ vidObj: req.data });

      this.setState({ videoObj: this.state.vidObj.results });
      let v = await this.state.videoObj.filter(function (video) {
        if (video.type === "Trailer" && video.site === "YouTube") {
          return true;
        } else return false;
      });

      await this.setState({ videoObj: v[0] });
    } else if (this.state.currId && !this.state.currTvid) {
      // https://api.themoviedb.org/3/

      let req = await axios.get(
        `${API_URL}movie/${this.state.currId}/videos?api_key=${API_KEY}&language=en-US`
      );

      this.setState({ vidObj: req.data });

      this.setState({ videoObj: this.state.vidObj.results });
      let v = await this.state.videoObj.filter(function (video) {
        if (video.type === "Trailer" && video.site === "YouTube") {
          return true;
        } else return false;
      });

      await this.setState({ videoObj: v[0] });
    }
  }

  async componentDidUpdate() {
    //   await axios.get("http://localhost:4000/fav").then((response)=>this.setState({dbId:response.data})).catch(err=>console.log(err))
  }

  toggleModal = async () => {
    await this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  sayTrue = () => {
    let state = false;
    this.state.dbId.map((e) => {
      if (this.state.currMovie == e.name || e.name == this.state.currTv) {
        state = true;
      }
    });

    return state;
  };

  sendRequest = async () => {
    let ans = await this.sayTrue();
    console.log("ans: ", ans);
    if (!ans) {
      let obj = {};

      if (this.state.currId) {
        obj = {
          movid: this.state.currId,
          name: this.state.currMovie,
          tvid: "",
          add: true,
        };
      } else {
        obj = {
          movid: " ",
          name: this.state.currTv,
          tvid: this.state.currTvid,
          add: true,
        };
      }

      (await this.state.watchlist) && this.setState({ watchlist: obj });

      console.log("watch", this.state.watchlist);

      //if prev if id matches current id then set add to false
      //if id in db set add to false

      // await (this.state.watchlist) && axios.post('http://localhost:4000/fav/add',this.state.watchlist).then(()=>{this.sayTrue()}).then(res => console.log(res.data)).catch(err=>console.log(err));
    } else {
      //delete from db
      let id = "";
      this.state.dbId.map((e) => {
        if (e.movid == this.state.currId || e.tvid == this.state.currId) {
          id = e._id;
        }
      });
      // await axios.delete('http://localhost:4000/fav/'+id).then(res=>console.log(res)).catch(err=>console.log(err))
      let arr = this.state.dbId.filter((movie) => {
        if (movie._id != id) {
          return true;
        }
      });
      this.setState({ dbId: arr });
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="netflix-home">
          <div
            className="top-pic"
            style={{ backgroundImage: `url(${this.state.image})` }}
          >
            <div className="fade-bottom"></div>
            <div className="info-movie">
              <div className="movie-title">
                <h1>{this.state.tvInfo.name}</h1>
              </div>
              <div className="button">
                <button className="play">Play</button>
                <button className="list">
                  <Link
                    to={{
                      pathname: "/fav",
                      query: { the: this.state.watchlist },
                    }}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    My List
                  </Link>
                </button>
              </div>
              <div className="movie-para">
                <p>{this.state.tvInfo.overview}</p>
              </div>
            </div>
          </div>

          {this.state.isModalOpen && (
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalBody
                style={{
                  backgroundImage: `url(${IMAGE_URL}/${this.state.currImg})`,
                }}
              >
                <ModalHeader toggle={this.toggleModal}>
                  {this.state.currMovie
                    ? this.state.currMovie
                    : this.state.currTv}
                </ModalHeader>

                <button
                  className="play"
                  style={{ float: "right" }}
                  onClick={() => {
                    this.sendRequest();
                    this.setState({ watch: !this.state.watch });
                  }}
                >
                  {/* //display----> 3 condition
                //already in database  ---> remove  (get request)
                //prev state is true----->remove(keep track of prev state of watchlist)
            //not in db and prev state is false===> add to watchlist */}

                  {this.sayTrue() ? (
                    <div>
                      <i class="fas fa-check-circle"></i>Remove
                    </div>
                  ) : (
                    <div>
                      <i class="far fa-check-circle"></i>WatchList
                    </div>
                  )}
                </button>

                <div className="modal-story">
                  <div className="modal-video">
                    {this.state.videoObj && (
                      <YouTube videoId={this.state.videoObj.key} opts={opts} />
                    )}
                  </div>
                  <div className="modal-info">
                    <div className="summary">{this.state.currInfo}</div>
                    <div className="rating">
                      Rating: {this.state.movieRating} IMDB
                    </div>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          )}

          <div className="bottom">
            {/* <div className="one">
              <div className="heading">Best Movies</div>
              <div className="pics">
                {this.state.popularMovie.map((movie) => {
                  return (
                    <div
                      className="pic-inside"
                      onClick={async () => {
                        await this.setState({ isModalOpen: true });
                        await this.setState({ currTvid: "" });
                        this.setState({ currTv: "" });
                        await this.setState({
                          currMovie: movie.title,
                          currImg: movie.poster_path,
                          currInfo: movie.overview,
                          currId: movie.id,
                          movieRating: movie.vote_average,
                        });
                        await this.playVideo();
                      }}
                    >
                      <img src={`${IMAGE_URL}/${movie.poster_path}`} />
                    </div>
                  );
                })}
              </div>
            </div> */}

            <div className="two" style={{marginTop:'-100px'}}>
              <div className="heading">Top Rated</div>
              <div className="pics">
                <Carousel
                  containerClass="carousel-container"
                  swipeable
                  responsive={responsive}
                >
                  {this.state.trending ? (
                    this.state.trending.map((movie, index) => {
                      return (
                        <div
                          key={index}
                          className="pic-inside"
                          onClick={async () => {
                            await this.setState({ isModalOpen: true });
                            await this.setState({ currTvid: "" });
                            this.setState({ currTv: "" });
                            await this.setState({
                              currMovie: movie.title,
                              currImg: movie.poster_path,
                              currInfo: movie.overview,
                              currId: movie.id,
                              movieRating: movie.vote_average,
                            });
                            await this.playVideo();
                          }}
                        >
                          <img
                            src={`${IMAGE_URL}/${movie.poster_path}`}
                            alt={index}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Carousel>
              </div>
            </div>

            <div className="three">
              <div className="heading">Limit Streams Special</div>
              <div className="pics">
                <Carousel
                  containerClass="carousel-container"
                  itemWidth={300}
                  swipeable
                  responsive={responsive}
                >
                  {this.state.tv.map((movie) => {
                    return (
                      <div
                        className="pic-inside originals"
                        onClick={async () => {
                          await this.setState({ isModalOpen: true });
                          await this.setState({ currId: "" });
                          this.setState({ currMovie: "" });
                          await this.setState({
                            currTv: movie.name,
                            currImg: movie.poster_path,
                            currInfo: movie.overview,
                            currTvid: movie.id,
                            movieRating: movie.vote_average,
                          });
                          console.log(this.state.currTvid);
                          await this.playVideo();
                        }}
                      >
                        <img src={`${IMAGE_URL}/${movie.poster_path}`} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            <div className="four">
              <div className="heading">Top Rated</div>
              <div className="pics">
                <Carousel
                  containerClass="carousel-container"
                  itemWidth={300}
                  swipeable
                  responsive={responsive}
                >
                  {this.state.topRated.map((movie) => {
                    return (
                      <div
                        className="pic-inside"
                        onClick={async () => {
                          await this.setState({ isModalOpen: true });
                          await this.setState({ currTvid: "" });
                          this.setState({ currTv: "" });
                          await this.setState({
                            currMovie: movie.title,
                            currImg: movie.poster_path,
                            currInfo: movie.overview,
                            currId: movie.id,
                            movieRating: movie.vote_average,
                          });
                          await this.playVideo();
                        }}
                      >
                        <img src={`${IMAGE_URL}/${movie.poster_path}`} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            <div className="five">
              <div className="heading">Latest</div>
              <div className="pics">
                <Carousel
                  containerClass="carousel-container"
                  itemWidth={300}
                  swipeable
                  responsive={responsive}
                >
                  {this.state.popularMovie.map((movie) => {
                    return (
                      <div
                        className="pic-inside"
                        onClick={async () => {
                          await this.setState({ isModalOpen: true });
                          await this.setState({ currTvid: "" });
                          this.setState({ currTv: "" });
                          await this.setState({
                            currMovie: movie.title,
                            currImg: movie.poster_path,
                            currInfo: movie.overview,
                            currId: movie.id,
                            movieRating: movie.vote_average,
                          });
                          await this.playVideo();
                        }}
                      >
                        <img src={`${IMAGE_URL}/${movie.poster_path}`} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            {/* <div className="five">
            <div className="heading">
                Top tv
            </div>
            <div className="pics">
            {this.state.popularMovie.map(movie=>{
                    return <div className="pic-inside" onClick={async()=>{
                        await this.setState({isModalOpen:true});
                        await this.setState({currTvid:''});this.setState({currTv:''})   
                        await this.setState({currMovie:movie.title,currImg:movie.poster_path,currInfo:movie.overview,currId:movie.id,movieRating:movie.vote_average});
                        await this.playVideo();
                        }}>
                        <img src={`${IMAGE_URL}/${movie.poster_path}`} alt="djd"/>
                    </div>
                })}
            </div>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}

export default NetflixHome;
