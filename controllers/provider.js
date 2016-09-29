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
  console.log("Saving as a Fav...");

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
	return res.redirect('/account');
  }

  User.findOne({ email: req.user.email }, (err, user) => {
  	console.log("trying to find the user");
    if (err) { 
    	console.log(err);
    	return next(err);
    }
    
    user.favoriteProviders.push(req.params.pidKey);
    console.log(user.favoriteProviders);
	user.save(function(err) {
	  if (err) { 
	   	console.log(err); 
	   	return next(err);
	  }
	  req.flash('success', { msg: 'Provider Saved To Favorites' });
	  res.writeHead(303, { Location : req.url });
	  res.end();
	});
  });
};