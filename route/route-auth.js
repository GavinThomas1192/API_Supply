'use strict';

const debug = require('debug')('APISupply:route-auth');
const errorHandler = require('../lib/error-handler');
const basicAuth = require('../lib/basic-auth-middleware');
const User = require('../model/user');

module.exports = function(router) {
  router.post('/api/signUp', (req, res) => {
    debug('POST /api/singUp');

    // get rid of the PW on req.body before the req is handed back as a nested object in the res
    let pw = req.body.password;
    delete req.body.password;

    let newUser = new User(req.body);

    newUser.generatePasswordHash(pw)
    // user => { username: 'x', password: 'encrypted', email: 'x@x.com' }
      .then(userA => userA.save())
      .then(userB => userB.generateToken())
      .then(token => res.send(token))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/signIn', basicAuth, (req, res) => {
    debug('GET /api/singIn');

    return User.findOne({ username: req.auth.username })
      .then(user => user.comparePasswordHash(req.auth.password))
      .then(user => user.generateToken())
      .then(token => res.send(token))
      .catch(err => errorHandler(err, req, res));
  });
};
