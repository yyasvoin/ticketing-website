//strict mode
'use strict';

var db = require('../dbconfig');

//SEE TICKET DETAILS AND COMMENTS
//SHOW route
function viewDetailsRoute(req, res, next) {
	let idQuery = 'SELECT id, subject FROM ticket_info WHERE ticket_info.id=?';
	let query =
		'SELECT ticket_id, details, date_created, name FROM ticket_details, ticket_info, users WHERE ticket_info.user_id=users.id AND ticket_details.ticket_id=? AND ticket_info.id=?';
	let id = req.params.id;	
	db.query(idQuery, [id], (error, result1) => {
		db.query(query, [id,id], (error, result2) => {
			res.render('Forms/viewDetails', {
				email          : req.session.email,
				pageId         : 'veiwDetails',
				title          : 'Tickets | Ticket Details',
				result1 : result1,
				result2 : result2
			});
		});
	});
}

//CREATE route - creates a comment and redirects to the ticket details page
function addReplyRoute(req, res, next) {
	let query = 'INSERT INTO ticket_details(ticket_id, details, date_created) VALUES(?, ?, NOW())';
	let id = req.params.id;
	let comment = req.body.comment; 
	db.query(query, [ id, comment ], () => {
		res.redirect(`/Forms/${req.params.id}`);
	});
}

module.exports = { get: viewDetailsRoute, post: addReplyRoute };
