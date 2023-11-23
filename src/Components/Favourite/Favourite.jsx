import axios from 'axios'
import React, { Component } from 'react'
import { API_KEY,API_URL, IMAGE_URL } from '../../API/secrets';
import Header from '../Header/Header';
import './Favourite.css'


class Favourite extends Component {
    state={
        watchlist:[],
        movieInfo:[],
        movieImg:[],
        movieTitle:[],
        name:''
    }

    async componentDidMount(){
      //  let data= await axios.get('http://localhost:4000/fav/')

      // .then(response => {
      //   console.log('res: ',response.data);
        
      //   this.setState({watchlist:response.data})
      // })
      // .catch((error) => {
      //   console.log(error);
      // })



      this.state.watchlist.map(async(e) =>{
        console.log('e ',e)
        if(e.movid!==' '){
          let req=await axios.get(`${API_URL}/movie/${e.movid}?api_key=${API_KEY}`) 
         
          console.log(e.movid)
          console.log(req.data.length);
          let img=IMAGE_URL+req.data.poster_path;
          this.setState({movieInfo:[...this.state.movieInfo,req.data]})
          await this.setState({movieImg:[...this.state.movieImg,img]})
          await this.setState({movieTitle:[...this.state.movieTitle,req.data.title]})

        }
        else{
          // https://api.themoviedb.org/3/tv/63174/videos?api_key=d8af0c11dd67d6349c48da4ffc70b8b0&language=en-US
          let req=await axios.get(`${API_URL}/tv/${e.tvid}?api_key=${API_KEY}`)
          console.log('req',req)
          let img=IMAGE_URL+req.data.poster_path;
          this.setState({movieInfo:[...this.state.movieInfo,req.data]})
        }
        console.log("respose ",e);
    })
    
    

  
    

    }

    // delete=async(id)=>{
    //   let mainId=''
    //   console.log('dele ',this.state.watchlist)
    //   this.state.watchlist.map((watch)=>{
       
    //     if(watch.movid!==' '){
    //       mainId=watch.movid
    //     }
    //     else if(watch.tvid!==' '){
    //       mainId=watch.tvid
    //     }
    //   })
    
      
      
    // }
   
    
    findMovie=async(name)=>{
      let mainId='';
      let id='';

    

      this.state.watchlist.map(e=>{
        if(e.name===name){
          mainId=e._id;
          id=e.tvid||e.movid;
        }
      })
      
      // await axios.delete('http://localhost:4000/fav/'+mainId).then(res=>console.log(res)).catch(err=>console.log(err))
      // let arr=this.state.movieInfo.filter((movie)=>{if(movie.id!=id)return true})
      // this.setState({movieInfo:arr})


    }
    
    
    
    
    render() {
        // console.log(this.state.movieInfo)


        return (
          <>
            <Header/>
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
             <button className="btn btn-dark my-button" onClick={(e)=>{
              //  await this.setState({name:});
                this.findMovie(movie.title||movie.name)
            }}>
                Remove from list
                </button>
            </div> 
            </div>
              })}
              </div>
            </div>
          </>
        )
    }
}

export default Favourite
