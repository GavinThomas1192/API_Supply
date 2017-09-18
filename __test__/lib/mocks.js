'use strict';

const User = require('../../model/user');
const APISupply = require('../../model/APISupply');
const Photo = require('../../model/photo');
const faker = require('faker');

const mocks = module.exports =  {};
mocks.user = {};
mocks.gallery = {};

mocks.user.createOne = function() {
  let result = {};
  result.password = faker.internet.password();

  let user = new User({
    name: faker.name.firstName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
  });

  return user.generatePasswordHash(result.password)
    .then(user => {
      result.user = user;
      return user.save();
    })
    .then(user => user.generateToken())
    .then(token => {
      result.token = token;
      return result;
    });
};

mocks.APISupply.creatOne = function() {

  return mocks.user.createOne()
    .then(userData => this.results = userData)
    .then(userData => {
      return new APISupply({
        name: faker.random.word(),
        desc: faker.random.words(12),
        userId: userData.user._id,
      }).save();
    })
    .then(gallery => {
      this.results.gallery = gallery;
      return this.results;
    });
};

mocks.photo.creatOne = function() {

  return mocks.user.createOne()
    .then(userData => this.results = userData)
    .then(userData => {
      return new Photo({
        name: faker.random.word(),
        desc: faker.random.words(12),
        userId: userData.user._id,
      }).save();
    })
    .then(photo => {
      this.results.photo = photo;
      return this.results;
    });
};

mocks.gallery.removeAll = function() {
  return Promise.all([
    APISupply.remove(),
  ]);
};

mocks.user.removeAll = function() {
  return Promise.all([
    User.remove(),
  ]);
};
