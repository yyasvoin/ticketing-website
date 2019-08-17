//strict mode
'use strict';

let db = require('../dbconfig');

//REGISTER ROUTE
//NEW route - shows the register form
function getRegisterRoutes(req, res) {
	res.render('PrivateRoute/register', {
		email  : req.session.email,
		pageId : 'register',
		title  : 'Forms | Register'
	});
}

// POST route - adds user to the database
function postRegisterRoutes(req, res) {
	 
	let query = 'INSERT INTO users(name, email, password) VALUES(?, ?, ?)';
	let email = req.body.email;
	let name = req.body.name;
	let password = req.body.password ;
	
	db.query(query, [ name, email, password ], (err,result) => {
		req.session.email = email;
		res.redirect('/Forms');
	});
}

module.exports = { get: getRegisterRoutes, post: postRegisterRoutes };
