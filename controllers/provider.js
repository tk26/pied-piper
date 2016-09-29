const Provider = require('../models/Provider');
const User = require('../models/User');
/**
 * GET /provider/{pidKey}
 * Provider Profile page.
 */
exports.getProvider = (req, res) => {
  const provider = new Provider();
  Provider.findOne({ pidKey: req.params.pidKey }, (err, provider) => {
    if (err) { 
    	console.log(err); 
    	res.render('provider', {
    		title: 'Provider Profile'
    	}); 
    }
    
    console.log(provider);

    //var providerExists =  (provider.favoritedBy.indexOf(req.user.email) == -1) ? false : true;
    
    res.render('provider', {
    	title: 'Provider Profile',
    	provider: provider
    });
  });
};

/**
 * POST /provider/{pidKey}
 * Provider Profile Save as Fav
 */
exports.saveProvider = (req, res, next) => {
  console.log("Saving the provider as a favorite...");

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
	  return res.redirect('/account');
  }

  User.findOne({ email: req.user.email }, (err, user) => {
  	console.log("Trying to find the user...");
    if (err) { 
    	console.log(err);
    	return next(err);
    }

    //console.log("Before saving... "+ user.favoriteProviders);
    var msg = "Provider Belongs to Favorites Already.";
    if(user.favoriteProviders.indexOf(req.params.pidKey)== -1){
      user.favoriteProviders.push(req.params.pidKey);
      msg = "Provider Saved To Favorites";
    }
    
    //console.log("After Saving... "+ user.favoriteProviders);
    
    user.save(function(err) {
  	  if (err) { 
  	   	console.log(err); 
  	   	return next(err);
  	  }
      req.flash('success', { msg: msg });
      res.writeHead(303, { Location : req.url });
      res.end();
    });
  });
  
  //save to provider as well
  /*
  Provider.findOne({ pidKey: req.params.pidKey}, (err, provider) => {
    console.log("Trying to find the associated provider...");
    const errors = req.validationErrors();

    if (err) { 
      console.log(err);
      return next(err);
    }

    console.log("Before saving... "+ provider.favoritedBy);

    //if()
    if(provider.favoritedBy.indexOf(req.user.email) != -1){
      provider.favoritedBy.push(req.user.email);
    }
    
    console.log("After Saving... "+ provider.favoritedBy);
    
    provider.save(function(err) {
      if (err) { 
        console.log(err); 
        return next(err);
      }
    });

    req.flash('success', { msg: 'Provider Saved To Favorites' });
    res.writeHead(303, { Location : req.url });
    res.end();
    
  });
  */
};