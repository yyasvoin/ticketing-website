//strict mode
'use strict';

var db = require('../dbconfig');

//ADD A NEW TICKET
//NEW route - shows the new ticket form
function getNewRoute(req, res) {
	res.render('Forms/newForm', {
		email  : req.session.email,
		pageId : 'newTicket',
		title  : 'Tickets | Create a Ticket'
	});
}

//CREATE route - creates the new ticket and redirects to all tickets page
function createNewRoute(req, res, next) {
	let idQuery = 'SELECT id from users where email =?';
	let insertQuery1 = 'INSERT INTO ticket_info(user_id, subject,status) VALUES(?, ? ,?)';
	let insertQuery2 = 'INSERT INTO ticket_details(ticket_id, details, date_created) VALUES(LAST_INSERT_ID(), ?, NOW())';
	let email = req.session.email;
	let subject =req.body.subject;
	let status =req.body.status;
	let details = req.body.detais;
	db.query(idQuery, [ email ], (error, userID) => {
		db.query(insertQuery1, [ userID[0].id, subject,status ], () => {
			db.query(insertQuery2, [ details ], () => {
				res.redirect('/Forms');
			});
		});
	});
}

module.exports = { get: getNewRoute, post: createNewRoute };
