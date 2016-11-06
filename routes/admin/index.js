var express = require('express');
var router = express.Router();

router.get('',ensureAuthenticated, function(req, res){
	res.render('admin/index', {title: "Admin Area"});
});

router.get('/login', function(req, res){
	res.render('admin/login', {title: "Login to admin system"});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated() && req.user.level == 0){
		next();
	}else{
		res.redirect('/mt_admin/login');
	}
}

module.exports = router;