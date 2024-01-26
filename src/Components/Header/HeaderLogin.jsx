import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { LOCAL_API_URL } from "../../API/secrets";

class Header extends Component {
  state = {
    newMovie: "",
    showInput: false,
    dbMovie: [],
    option: false,
  };

  async componentDidMount() {
    await axios
      .get(`${LOCAL_API_URL}search/`)
      .then((res) => this.setState({ dbMovie: res.data }))
      .catch((err) => console.log(err));
  }

  handleChange = async (e) => {
    this.setState({ newMovie: e.target.value });
  };

  handleSubmit = async (e) => {
    if (e.key === "Enter") {
      this.props.currMovie(this.state.newMovie);

      await axios
        .post(`${LOCAL_API_URL}search/add`, this.state.newMovie)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src="sample.png" alt="netflix" style={{height:50}} />
          <div class="header-links">
          </div>
        </div>
        <div className="search-btn">
          {/* <Link  to="/search" exact ><input  id="browsers" className="input-text" type={(this.state.showInput)?"text":"hidden"}  onClick={()=>{this.setState({option:true})}}  placeholder="Search" value={this.state.newMovie}  onChange={this.handleChange} onKeyPress={this.handleSubmit}  /> </Link>            
                {(!this.state.showInput) &&  <i className="fas fa-search"  style={{color:"white"}} onClick={()=>{this.setState({showInput:!this.state.showInput})}}></i>} */}
          <div class="header-link">
            {/* <Link  to="/login" exact >Login</Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
