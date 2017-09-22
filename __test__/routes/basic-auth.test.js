'use strict';

// const faker = require('faker');
const mocks = require('../../__test__/lib/mocks');
// const User = require('../../model/user');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

describe('Testing basic auth routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.user.removeAll);


  describe('POST to /api/signUp', function() {
    beforeAll(() => {
      this.mockUserData = {
        name: 'Madeline',
        username: 'MaddyRocks101',
        password: 'ILoveCodez',
        email: 'testtest.com',
        subscribedToEmail: true,
        isAdmin: true,
      };


      return superagent.post(':4444/api/signUp')
        .send(this.mockUserData)
        .then(res => this.res = res)
        .catch(console.error);
    });

    test('should respond with 200 on successful signUp:', () => {
      expect(this.res.status).toBe(200);
    });
    describe('Should throw 409 error duplicate', () => {
      beforeAll(() => {
        this.mockUserData = {
          name: 'Madeline',
          username: 'MaddyRocks101',
          password: 'ILoveCodez',
          email: 'testtest.com',
          subscribedToEmail: true,
          isAdmin: true,
        };


        return superagent.post(':4444/api/signUp')
          .send(this.mockUserData)
          .then(res => this.res = res)
          .catch(console.error);
      });
      test('signup with duplicate name and username', () => {
        return superagent.post(':4444/api/signUp')
          .send(this.mockUserData)
          .then(res => this.res = res)
          .catch(err => {
            expect(err.status).toBe(409);
          });
      });
    });
  });


  describe('GET to /api/signin', function() {
    beforeAll(() => {
      return mocks.user.createOne()
        .then(userData => {
          this.tempUser = userData.user;
          return superagent.get(':4444/api/signIn')
            .auth(userData.user.username, userData.password)
            .then(res => this.res = res);
        });
    });
    test('#VALID request should return a token', () => {
      expect(this.res.text).toBeTruthy();
      expect(this.res.text.length > 1).toBeTruthy();
      expect(this.res.status).toBe(200);
    });
  });


  describe('#INVALID login', function() {
    test('should return 401 for bad ', () => {
      return mocks.user.createOne()
        .then(userData => {
          this.tempUser = userData.user;
          return superagent.get(':4444/api/signIn')
            .auth(userData.user.username, userData.password34)
            .catch(err => {
              expect(err.status).toBe(401);
            });
        });
    });
  });
});
