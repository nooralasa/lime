// ------------------------------------------------- //
// The Users Router                                  //
// The router handling all api cals to /api/v1/users //
// ------------------------------------------------- //

/** 
 * Express Imports
 * @import express the main express web framework
 * @import router the express router to handle api calls
 **/
var express = require('express');
var router = express.Router();

//Users ORM for manipulating users data
var User = require('../models/User');

//Create User
router.post('/', function (req, res, next) {
  var data = {
    gitlab_access_token: req.body.gitlab_access_token,
    github_access_token: req.body.github_access_token,
    gitter_access_token: req.body.gitter_access_token,
    id: req.body.id, 
    name: req.body.name, 
    affiliation: req.body.affiliation, 
    about: req.body.about, 
    role: req.body.role, 
    image: req.body.image,
    portfolio: req.body.portfolio,
    chat_link: req.body.chat_link
  };

  User.create_user(data, function(error, results) {
    console.log('error', error);
    console.log('results', results);

    if (error) {
      return res.status(500).json({success: false, data: error});
    }

    if (results) {
      return res.json(results);
    }
  });
});

//Read Currently Logged In User from sessions
router.get('/current', function (req, res, next) {
  if (req.session.passport == undefined || req.session.passport.user.id == undefined) {
    // return res.json({
    //   user_id: '1215701',
    //   role: 'scholar',
    //   authenticated: true
    // });
    // return res.json({
    //   user_id: '1128287',
    //   role: 'admin',
    //   authenticated: true
    // });
    console.log('Error Not Authenticated');
    return res.json({
      authenticated: false
    });
  } else {
    console.log('Authenticated');

    User.get_user(req.session.passport.user.id, function(error, results) {

      if (error) {
        return res.json({
          authenticated: false
        });
      }

      if (results) {
        return res.json({
          authenticated: true,
          user_id: req.session.passport.user.id,
          role: results.role
        });
      }
    });
  }

  // return res.json({user_id: '5400684'});

});

//Read User
router.get('/:user_id', function (req, res, next) {
  var results = [];

  var id = req.params.user_id;

  User.get_user(id, function(error, results) {
    console.log('error', error);
    console.log('results', results);

    if (error) {
      return res.status(500).json({success: false, data: error});
    }

    if (results) {
      return res.json(results);
    }
  });
});

//Read Users
router.get('/', function (req, res, next) {
  User.get_users(function(error, results) {
    console.log('error', error);
    console.log('results', results);

    if (error) {
      return res.status(500).json({success: false, data: error});
    }

    if (results) {
      return res.json(results);
    }
  });
});

//Update User
router.put('/:user_id', function (req, res, next) {
  var id = req.params.user_id;
  
  var data = {
    name: req.body.name, 
    affiliation: req.body.affiliation, 
    about: req.body.about, 
    role: req.body.role, 
    image: req.body.image,
    portfolio: req.body.portfolio,
    chat_link: req.body.chat_link
  };

  console.log(id);

  User.update_user(id, data, function(error, results) {
    console.log('data', data);
    console.log('error', error);
    console.log('results', results);

    if (error) {
      return res.status(500).json({success: false, data: error});
    }

    if (results) {
      return res.json(results);
    }
  });
});

//Delete User
router.delete('/:user_id', function (req, res, next) {
  var id = req.params.user_id;
  
  User.soft_delete_user(id, function(error, results) {
    console.log('error', error);
    console.log('results', results);

    if (error) {
      return res.status(500).json({success: false, data: error});
    }

    if (results) {
      return res.json(results);
    }
  });
});

//Add User Course
router.post('/courses/', function (req, res, next) {
  var data = {
    course_id: req.body.course_id,
    user_id: req.body.user_id
  };

  User.add_course_to_user(data, function(error, results) {
    console.log('error', error);
    console.log('results', results);

    if (error) {
      return res.status(500).json({success: false, data: error});
    }

    if (results) {
      return res.json(results);
    }
  });
});

//Read User Courses
router.get('/courses/:user_id', function (req, res, next) {
  var user_id = req.params.user_id;

  User.get_user_courses(user_id, function(error, results) {
    console.log('error', error);
    console.log('results', results);

    if (error) {
      return res.status(500).json({success: false, data: error});
    }

    if (results) {
      return res.json(results);
    }
  });
});

//Read User Submissions
router.get('/submissions/:user_id', function (req, res, next) {
  var user_id = req.params.user_id;

  User.get_user_submissions(user_id, function(error, results) {
    console.log('error', error);
    console.log('results', results);

    if (error) {
      return res.status(500).json({success: false, data: error});
    }

    if (results) {
      return res.json(results);
    }
  });
});

module.exports = router;
