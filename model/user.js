'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


const User = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
    type: String, required: true,
  },
  // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  subscribedToEmail: { type: Boolean, required: true},
  findHash: { type: String, unique: true },
  isAdmin: {type: Boolean, required: true},
  favorites: {type: Boolean, required: false},
});

User.methods.generatePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    /* istanbul ignore next */
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

User.methods.comparePasswordHash = function(password) {

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(new Error('authorization failed, password did not match'));
      resolve(this);
    });
  });
};
/* istanbul ignore next */
User.methods.generateFindHash = function() {
  return new Promise((resolve, reject) => {
    let tries = 0;

    let _generateFindHash = () => {
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
        .then(() => resolve(this.findHash))
        .catch(err => {
          if(tries > 3) return reject(new Error('authorization failed; could not validate findHash'));
          tries++;
          _generateFindHash();
          console.log(err.status);
        });
    };

    _generateFindHash();
  });
};
/* istanbul ignore next */
User.methods.generateToken = function() {

  return new Promise((resolve, reject) => {
    this.generateFindHash()
      .then(findhash => resolve(jwt.sign({ token: findhash }, process.env.APP_SECRET)))
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};

module.exports = mongoose.model('user', User);
