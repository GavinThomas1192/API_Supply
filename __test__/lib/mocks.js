'use strict';

const User = require('../../model/user');
const APISupply = require('../../model/APISupply');
const faker = require('faker');

const mocks = module.exports =  {};
mocks.user = {};
mocks.APISupply = {};

mocks.user.createOne = function() {
  this.result = {
    password: faker.internet.password(),
  };
  // result.password = faker.internet.password();

  let user = new User({
    username: faker.internet.userName(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    subscribedToEmail: true,
    isAdmin: true,
  });

  return user.generatePasswordHash(this.result.password)
    .then(user => {
      this.result.user = user;
      return user.save();
    })
    .then(user => user.generateToken())
    .then(token => {
      this.result.token = token;
      return this.result;
    });
};

// mocks.APISupply.createOne = function() {
//
//   return mocks.user.createOne()
//     .then(userData => this.results = userData)
//     .then(userData => {
//       return new APISupply({
//         name: faker.random.word(),
//         desc: faker.random.words(12),
//         examplesOfUse: faker.random.words(12),
//         examplesInUse: faker.random.words(12),
//         rating: faker.random.words(12),
//         tokenRequired: true,
//         tokenAccessWaitTime: '36hrs',
//         maxReqMin: '20',
//         numUsersFav: '3',
//         _category: faker.random.words(12),
//         userId: userData.user._id,
//
//       }).save();
//     })
//     .then(APISupply => {
//       this.results.APISupply = APISupply;
//       return this.results;
//     });
// };


mocks.APISupply.removeAll = function() {
  return Promise.all([
    APISupply.remove(),
  ]);
};

mocks.user.removeAll = function() {
  return Promise.all([
    User.remove(),
  ]);
};
