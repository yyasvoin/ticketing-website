//strict mode
'use strict';

let db = require('../dbconfig');

// LOGIN ROUTE
//NEW route - shows the login form
function getLoginRoutes(req, res) {
	res.render('PrivateRoute/login', {
		email  : req.session.email,
		pageId : 'login',
		title  : 'Tickets | Login'
	});
}



//POST ROUTE - checks to make sure  user is already in the database
function postLoginRoutes(req, res) {
	let emailQuery = 'SELECT email FROM users WHERE email =?';
	let email = req.body.email;
	let password = req.body.password;
	db.query(emailQuery,email, (error, dbEmail ) => {
		if (email !== dbEmail[0].email) {
			res.redirect('/');
		} else {
			let passwordQuery = 'SELECT password FROM users WHERE email =?';
			db.query(passwordQuery, email, (error, dbPassword ) => {
				if (password !== dbPassword[0].password) {
					res.redirect('/');
				} else {
					req.session.email = email;
					res.redirect('/Forms');
				}
			});
		}
	});
}

module.exports = { get: getLoginRoutes, post: postLoginRoutes };
