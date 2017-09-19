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
        email: 'test@test.com',
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
  });

  describe('GET to /api/signIn', function() {
    beforeAll(() => {
      this.mockUserData = {
        name: 'Madeline',
        username: 'MaddyRocks101',
        password: 'ILoveCodez',
        email: 'test@test.com',
        subscribedToEmail: true,
        isAdmin: true,
      };

      return superagent.post(':4444/api/signUp')
        .send(this.mockUserData)
        .then(res => this.res = res)
        .catch(console.error);
    });
    test('#SIGNIN:', () => {

      return superagent.get(':4444/api/signin')
        .auth('MaddyRocks101', 'ILoveCodez')
        .then(res => this.res = res);
    });
  });

  test('should return with 200 on successful signIn:', () => {
    console.log(this.res);
    expect(this.res.status).toBe(200);
  });
});
