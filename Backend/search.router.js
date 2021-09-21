const router = require('express').Router();
let Search = require('./search.model');


router.route('/').get((req, res) => {
  Search.find()
    .then(fav => res.json(fav))
    .catch(err => res.status(400).json('Error: ' + err));

});

// Fav.deleteMany({},function(err){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("success")
//     }
// })

//post request for  favourites

router.route('/add').post((req, res) => {
  const movie=req.body.movie;


  const newSearch = new Search({
   movie
  });

  newSearch.save()
  .then(() => res.json('Search added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').delete((req, res) => {
//   Search.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Favourite deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });




module.exports=router