const Provider = require('../models/Provider');

/**
 * GET /search
 * Search page.
 */
exports.getSearch = (req, res) => {
  res.render('search', {
    title: 'Search'
  });
};

/**
 * POST /search
 * Search by using keywords
 */
exports.postSearch = (req, res, next) => {
  
  const provider = new Provider({
    City : req.body.city
  });

  Provider.find({ City: req.body.city }, (err, providers) => {
    if (!err){ 
    	//play with the providers
    	//res.render(providers);
    } 
  });
  res.redirect('back');
};

