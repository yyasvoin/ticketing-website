//strict mode
'use strict';

//Adding Express
let express = require('express');

// Create instance of an express router
let router = express.Router();

//Define Routes
let loginRoute = require('./PrivateRoute/login');
let logoutRoute = require('./PrivateRoute/logout');
let registerRoute = require('./PrivateRoute/register');
let viewMyTicketRoute = require('./Forms/myPage');
let createRoute = require('./Forms/newForm');
let viewDetailsRoute = require('./Forms/viewDetails');
let addReplyRoute = require('./Forms/viewDetails');


/**
 * Define routes
 */

// Login Page
router.get('/', loginRoute.get);
router.post('/', loginRoute.post);

// Logout Page
router.get('/logout', logoutRoute.get);

// Register Page
router.get('/register', registerRoute.get);
router.post('/register', registerRoute.post);

// See All Tickets
router.get('/Forms', viewMyTicketRoute.get);

// Add new ticket to the database
router.get('/Forms/new', createRoute.get);
router.post('/Forms', createRoute.post);

// See ticket details
router.get('/Forms/:id', viewDetailsRoute.get);
router.post('/Forms/:id', addReplyRoute.post);

module.exports = router;
