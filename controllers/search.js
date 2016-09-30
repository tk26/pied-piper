const Provider = require('../models/Provider');
const User = require('../models/User');

/**
 * GET /search
 * Search page.
 */
exports.getSearch = (req, res) => {
  const provider = new Provider({
    City : req.body.city
  });
  providers = [];
  res.render('search', {
    title: 'Search'
  });
};

/**
 * POST /search
 * Search by using keywords
 */
exports.postSearch = (req, res, next) => {
  const provider = new Provider();
 
  //Get options
  var specArr = [];
  if(req.body.option1){
    specArr.push("DDOM");
  }
  if(req.body.option2){
    specArr.push("DDOO");
  }
  if(req.body.option3){
    specArr.push("DDED");
  }

  if(req.body.option4){
    specArr.push("DDPI");
  }
  if(req.body.option5){
    specArr.push("DDPD");
  }
  if(req.body.option6){
    specArr.push("DDPE");
  }

  /*Provider.find({ City: { $regex : new RegExp(req.body.city, "i") }, Accepting:"Y" }, (err, docs) => {
    if (!err){ 
    	//console.log(docs);
    	res.render('search', { title: 'Search', providers: docs });
    } 
  });*/
  var location = "";
  var city = "";
  var state = "";
  if(typeof req.user === 'undefined'){
    //not loggedin Users
    city = "Cincinnati";
    state = "OH";
    //get everything in providers array of same city and state and matched specs
        Provider.find({
        Spec : { $in : specArr },
        Accepting : "Y" ,
        City: {$regex : new RegExp(city, "i")},
        St: {$regex : new RegExp(state, "i")}
         },
         (err, docs) => {
          // console.log(docs);
          if (!err){ 
            res.render('search', { title: 'Search', providers: docs });
          } 
        }).limit(20);
  }
  else{
    User.findOne({
    email : req.user.email
    },
     (err, doc) => {
      //got user's city
      location = doc.profile.location;
      //now get city and state
      var locationSplitted = location.split(',');
      city = locationSplitted[locationSplitted.length - 2].trim();
      state = locationSplitted[locationSplitted.length - 1].trim();
      console.log(city);
      console.log(state);
      //get everything in providers array of same city and state and matched specs
        Provider.find({
        Spec : { $in : specArr },
        Accepting : "Y" ,
        City: {$regex : new RegExp(city, "i")},
        St: {$regex : new RegExp(state, "i")}
         },
         (err, docs) => {
          // console.log(docs);
          if (!err){ 
            res.render('search', { title: 'Search', providers: docs });
          } 
        }).limit(20);
    });
  }
  



  /*var url = req.url + "#providers";
  res.writeHead(303, { Location : url });
  res.end();*/
};

