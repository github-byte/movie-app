import axios from 'axios'
import React, { Component } from 'react'
import { API_KEY,API_URL, IMAGE_URL } from '../../API/secrets';
import './Favourite.css'


class Favourite extends Component {
    state={
        watchlist:[],
        movieInfo:[],
        movieImg:[],
        movieTitle:[]
    }

    async componentDidMount(){
       let data= await axios.get('http://localhost:4000/fav/')

      .then(response => {
        console.log(response.data);
        
        this.setState({watchlist:response.data})
      })
      .catch((error) => {
        console.log(error);
      })



      this.state.watchlist.map(async(e) =>{
        if(e.id){
          let req=await axios.get(`${API_URL}/movie/${e.id}?api_key=${API_KEY}`) 
         
          console.log(e.id)
          console.log(req.data.length);
          let img=IMAGE_URL+req.data.poster_path;
          this.setState({movieInfo:[...this.state.movieInfo,req.data]})
          await this.setState({movieImg:[...this.state.movieImg,img]})
          await this.setState({movieTitle:[...this.state.movieTitle,req.data.title]})

        }
        else if(e.tvid){
          let req=await axios.get(`${API_URL}discover/tv/${e.tvid}?api_key=${API_KEY}&with_networks=213`)
          console.log(req)
          let img=IMAGE_URL+req.data.poster_path;
          this.setState({movieInfo:[...this.state.movieInfo,req.data]})
        }
        console.log(e);
    })
    
    


    }

    delete=async(id)=>{
      let mainId=''
      
      this.state.watchlist.map((watch)=>{
        if(watch.id==id) {
          mainId=watch._id
  
        };
      })
    
      await axios.delete('http://localhost:4000/fav/'+mainId).then(res=>console.log(res)).catch(err=>console.log(err))
      let arr=this.state.movieInfo.filter((movie)=>{if(movie.id!=id)return true})
      this.setState({movieInfo:arr})

    }
    
    
   
    
    
    
    
    render() {
        // console.log(this.state.movieInfo)


        return (
            <div className="movie-fav">
             <div className="fav-head">
             <h3>Your Favourites</h3>
             </div>
            
             <div className="movie-card">
             {this.state.movieInfo.map((movie)=>{
                 return <div className="fav-card">
                 <div className="fav-img">
                <img src={IMAGE_URL+movie.poster_path} alt="img"/>   
             </div>
             <div className="fav-text">
             <button className="btn btn-dark my-button" onClick={(e)=>{this.delete(movie.id)}}>
                Remove from list
                </button>
            </div> 
            </div>
              })}
              </div>
    

            
            </div>
        )
    }
}

export default Favourite
