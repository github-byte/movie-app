const router = require('express').Router();
let Fav = require('./favourite.model');

//get request for fav

router.route('/').get((req, res) => {
  Fav.find()
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
  const id=req.body.id;
  const tvid=req.body.tvid;
  const add=req.body.add


  const newFav = new Fav({
   id,
   tvid,
   add
  });

  newFav.save()
  .then(() => res.json('Favourite added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Fav.findByIdAndDelete(req.params.id)
    .then(() => res.json('Favourite deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports=router