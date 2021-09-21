import axios from 'axios';
import React, { Component } from 'react'
import { API_URL,API_KEY} from '../../API/secrets';
import YouTube from 'react-youtube'
import './MoviePage.css'


class MoviePage extends Component {
    state={
        videoObj:{}
    }



    async componentDidMount(){
        //https://api.themoviedb.org/3/movie/500/videos?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US
        let id=this.props.location.query.the.id;
        let req=await axios.get(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
       let videoObj=req.data.results;

       let v=videoObj.filter(function(video){
           if(video.type==="Trailer" && video.site==='YouTube'){
               return true;
           }
           else return false;
       })
       this.setState({videoObj:v[0]})

    }





    render() {
        // console.log()
        let {title,tagline,img,vote_average,overview} = this.props.location.query.the;
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1,
            }
        }
        return (
            <div className="movie-page">
            <div className="movie-poster">
               <img src={img} alt="image"/>
            </div>
                <div className="movie-page-details">
                <div className="movie-title-info">
                    <h1>{title} </h1>
                    <span style={{color:'#DB202C'}}> {vote_average} IMDB</span><br></br>
                    <span>{tagline}</span>
                    <p>{overview}</p>
                    <YouTube videoId={this.state.videoObj.key} opts={opts} />
                </div>
                </div>
            </div>
        )
    }
}

export default MoviePage
 