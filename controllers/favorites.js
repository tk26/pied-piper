const Provider = require('../models/Provider');
const User = require('../models/User');

/**
 * GET /favorites
 * Favorites page.
 */
exports.getFavorites = (req, res) => {
  
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
	  return res.redirect('/account');
  }

  User.findOne({ email: req.user.email }, (err, user) => {
    if (!err){ 
    	res.render('favorites', {
    	title: 'Favorites',
    	providers : user.favoriteProviders
  		});
    } 
  });
};