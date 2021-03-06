// --------------------------------------------------------- //
// The Gitlab API Router                                	   //
// The router handling all gitlab api cals to /api/v1/gitlab //
// --------------------------------------------------------- //

/** 
 * Express Imports
 * @import express the main express web framework
 * @import router the express router to handle api calls
 **/
var express = require('express');
var router = express.Router();

/** 
 * ORM Imports
 * @import Gitlab_API model for accessing gitlab api
 * @import User model for fetching and manipulating user data 
 **/
var Gitlab_API = require('../models/Gitlab_API');
var User = require('../models/User');

//Fork Portfolio
router.get('/forkportfolio/:user_id', function(req, res, next) {

	User.get_user(req.params.user_id, function(err, result) {
		if (err) {
			console.log('error');
			return res.status(500).json({success: false, data: err});
		}

		if (result) {
			console.log('result ', result);
			var username = result.portfolio;
			username = username.substring(8, username.length - 25);
			Gitlab_API.fork_and_setup_portfolio(result.gitlab_access_token, result.name, username, result.image, function(err, results) {
				if (err) {
					console.log('error');
					return res.status(500).json({success: false, data: err});
				}
				if (results) {
					console.log('success');
					return res.json({username: username, name: result.name});
				}
			});
		}
	});	
});

module.exports = router;
