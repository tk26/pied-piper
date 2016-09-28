const Provider = require('../models/Provider');

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
  
  const provider = new Provider({
    City : req.body.city
  });

  Provider.find({ City: req.body.city }, (err, docs) => {
    if (!err){ 
    	//console.log(docs);
    	res.render('search', { title: 'Search', providers: docs });
    } 
  });
};

