//strict mode
'use strict';

let db = require('../dbconfig');


function viewMyTicketRoute(req, res, next) {
	if (!req.session.email) {
		res
		.status(403)
	} else {
		let idQuery = 'SELECT id from users where email =?';
		let groupByQuery = 'SELECT id, subject,details, status, date_created FROM ticket_info,ticket_details WHERE user_id=? GROUP BY id ORDER BY id DESC';
		let email = req.session.email ;
		db.query(idQuery, [ email ], (error, result) => {
			db.query(groupByQuery, [ result[0].id ], (error, parameters) => {
				res.render('Forms/myPage', {
					email      : req.session.email,
					pageId     : 'Forms',
					title      : 'Forms | All Forms',
					parameters : parameters
				});
			});
		});
	}
}

module.exports = { get: viewMyTicketRoute };
