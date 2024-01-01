import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Header extends Component {
  state = {
    newMovie: "",
    showInput: false,
    dbMovie: [],
    option: false,
  };

  async componentDidMount() {
    await axios
      .get("http://localhost:4000/search/")
      .then((res) => this.setState({ dbMovie: res.data }))
      .catch((err) => console.log(err));
  }

  handleChange = async (e) => {
    this.setState({ newMovie: e.target.value });
  };

  handleSubmit = async (e) => {
    if (e.key === "Enter") {
    //   this.props.currMovie(this.state.newMovie);

      await axios
        .post("http://localhost:4000/search/add", this.state.newMovie)
        .then((res) => console.log('my res33',res))
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="header">
        <div className="logo">
          <Link to={"/home"}><img src="sample.png" alt="netflix" /></Link>
          <div class="header-links">
            <div class="header-link">
              <Link to="/home" exact>
                Home
              </Link>
            </div>
            <div class="header-link">
              <Link to="/fav" exact>
                Favourites
              </Link>
            </div>
            <div class="header-link">
              <Link to="/search" exact>
                Search
              </Link>
            </div>
          </div>
        </div>
        <div className="search-btn">
          <Link to="/search" exact>
            <input
              id="browsers"
              className="input-text"
              type={this.state.showInput ? "text" : "hidden"}
              onClick={() => {
                this.setState({ option: true });
              }}
              placeholder="Search"
              value={this.state.newMovie}
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit}
            />{" "}
          </Link>
          {!this.state.showInput && (
            <i
              className="fas fa-search"
              style={{ color: "white", marginTop: '4px', cursor:"pointer" }}
              onClick={() => {
                this.setState({ showInput: !this.state.showInput });
              }}
            ></i>
          )}
          <div class="header-link">
            <Link to="/login" exact>
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
