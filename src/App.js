import React, { Component } from 'react';
import Movies from './Components/Movies/Movies.jsx';
import HeaderLogin from './Components/Header/HeaderLogin.jsx';
import axios from 'axios'
import { API_KEY, API_URL } from './API/secrets.js';
import Pagination from './Components/Pagination/Pagination'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Favourite from './Components/Favourite/Favourite'
import MoviePage from './Components/MoviePage/MoviePage'
import NetflixHome from './Components/NetfixHome/NetflixHome.jsx';
import LoginPage from './Components/Login/LoginPage.js';
import Header from './Components/Header/Header.jsx';
import SearchPage from './SearchPage.js';
import PrivateRoute from './privateRoute.js';
//rce

class App extends Component {

  state = {
    movieData: [],
    currMovie: 'avenger',
    currPage: 1,
    pages: []

  }

  async componentDidMount() {
    // API call
    // https://api.themoviedb.org/3/search/movie?api_key=bdd243ea847239dc0799805e63e189f0&query=avengers&page=1&include_adult=false

    console.log("my window content", window.localStorage)
    let data = await axios.get(API_URL + 'search/movie', {
      params: { api_key: API_KEY, page: this.state.currPage, query: this.state.currMovie },
    });

    let movieData = data.data.results.slice(0, 10);
    this.setState({
      movieData: movieData,
    });
  }


  setMovie = async (newMovie) => {
    let data = await axios.get(API_URL + 'search/movie', { params: { api_key: API_KEY, page: this.state.currPage, query: newMovie } })
    let pagesCount = data.data.total_pages;
    console.log(pagesCount)
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    let movieData = data.data.results.slice(0, 10);
    this.setState({ movieData: movieData, currMovie: newMovie, pages: pages });
  }


  prevPage = async () => {
    let data = await axios.get(API_URL + 'search/movie', {
      params: { api_key: API_KEY, page: this.state.currPage - 1, query: this.state.currMovie },
    });

    let movieData = data.data.results.slice(0, 10);
    this.setState({
      movieData: movieData,
      currPage: this.state.currPage - 1
    });
  }

  setPage = async (e) => {
    let pageNum = Number(e);
    let data = await axios.get(API_URL + 'search/movie', { params: { api_key: API_KEY, page: pageNum, query: this.state.currMovie } });
    console.log(data)
    let movieData = data.data.results.slice(0, 10);
    this.setState({ movieData: movieData, currPage: pageNum })
  }

  nextPage = async () => {
    let data = await axios.get(API_URL + 'search/movie', {
      params: { api_key: API_KEY, page: this.state.currPage + 1, query: this.state.currMovie },
    });

    let movieData = data.data.results.slice(0, 10);
    this.setState({
      movieData: movieData,
      currPage: this.state.currPage + 1
    });
    //  if(this.state.currPage>5)
    //  await this.setState({pages:this.state.pages.slice(this.state.currPage-1,this.state.currPage+5)})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute>
              <Route path="/" exact component={NetflixHome}></Route>
              <Route path='/search' exact component={SearchPage}></Route>
              <Route path="/moviePage" component={MoviePage}></Route>
              <Route path="/fav" component={Favourite}></Route>
              <Route path="/login" exact component={LoginPage}></Route>
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;

