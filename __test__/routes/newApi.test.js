'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
// const Gallery = require('../../model/gallery');
require('jest');

describe('Testing API-Supply Routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.APISupply.removeAll);
  afterEach(mocks.user.removeAll);


  //****************POST****************
  describe('POST to /api/newApi', function() {
    describe('Valid Requests', function() {
      beforeAll(() => {
        this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => {
            this.res = res;
          });
      });

      test('should return a status of 201', () => {
        expect(this.res.status).toBe(201);
      });
      test('should return a new api object in the response', () => {
        expect(this.res.body.name).toBe(this.APISupply.name);
        expect(this.res.body.desc).toBe(this.APISupply.desc);
        expect(this.res.body._category).toBe('music');
      });
      test('should have a userId property', () => {
        expect(this.res.body).toHaveProperty('userId');
        expect(this.res.body.userId.toString()).toBe(this.userData.user._id.toString());
      });
    });

    describe('Invalid Requests', function() {
      beforeEach(() => {
        this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };

        return mocks.user.createOne()
          .then(userData => this.userData = userData);
      });

      test('should return a status of 401 given no Auth credentials',  () => {
        return superagent.post(':4444/api/newApi')
          .send(this.APISupply)
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });

      test('should return a 401 given bad Auth credentials', () => {
        return superagent.post(':4444/api/newApi')
          .set('Authorization', 'Bearer badToken')
          .send(this.APISupply)
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });

      test('should return 400 given bad req body', () => {
        return superagent.post(':4444/api/newApi')
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({ name: 'gavin'})
          .catch(err => {
            // console.log('testingggg', err);
            expect(err.status).toBe(400);
          });
      });
    });
  });

  //****************GETALL****************
  describe('GET to /api/newApi/getAll', function() {
    describe('Valid Requests to GETALL', () => {
      beforeAll(() => {
        this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => this.res = res);
      });
      test('should return 200 for valid GETALL requests', () => {
        return superagent.get(':4444/api/newApi/getAll')
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });

    describe('Invalid Requests to getAll', () => {
      beforeAll(() => {
        this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => this.res = res);
      });
      test('should return 401 for bad token', () => {
        return superagent.get(':4444/api/newApi/getAll')
          .set('Authorization', `Bearer ${this.userData.token} + 1`)
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });
    });
  });

  //****************GETALLBYID****************
  describe('GET to /api/getAllById', function() {
    describe('Valid Requests to GET by ID', () => {
      beforeAll(() => {
        this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => this.res = res);
      });
      test('should return 200 for valid GET requests', () => {
        return superagent.get(`:4444/api/newApi/getAllById/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      describe('Invalid Requests to GET by ID', () => {
        beforeAll(() => {
          this.APISupply = {
            name: faker.random.word(),
            url: faker.internet.url(),
            desc: faker.random.words(12),
            examplesOfUse: faker.lorem.words(),
            examplesInUse: faker.internet.url(),
            rating: 'poor',
            tokenRequired: 'yes',
            tokenAccessWaitTime: '36hrs',
            maxReqMin: '20',
            numUsersFav: '3',
            _category: 'music',
          };

          return mocks.user.createOne()
            .then(userData => this.userData = userData)
            .then(() => {
              return superagent.post(':4444/api/newApi')
                .set('Authorization', `Bearer ${this.userData.token}`)
                .send(this.APISupply);
            })
            .then(res => this.res = res);
        });
        test('should return 401 for bad token', () => {
          return superagent.get(`:4444/api/newApi/getAllById/${this.res.body._id}`)
            .set('Authorization', `Bearer ${this.userData.token} + 1`)
            .catch(err => {
              expect(err.status).toBe(401);
            });
        });
        test('should return 404 for bad API ID', () => {
          return superagent.get(`:4444/api/newApi/getAllById/22222`)
            .set('Authorization', `Bearer ${this.userData.token}`)
            .catch(err => {
              expect(err.status).toBe(404);
            });
        });
      });
    });
  });
  //****************GETBYCATEGORY****************

  describe('GET to /api/getAllByCategory', function() {
    describe('Valid Requests to GET by Categoy', () => {
      beforeAll(() => {
        this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => this.res = res);
      });
      test('should return 200 for valid GET by Category', () => {
        return superagent.get(`:4444/api/newApi/getAllByCategory/${this.res.body._category}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.body.name).toBe(this.res.name);
            expect(res.status).toBe(200);
          });
      });
      test('should return correct name for valid GET by Category', () => {
        return superagent.get(`:4444/api/newApi/getAllByCategory/${this.res.body._category}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.body.name).toBe(this.res.name);
          });
      });

      describe('Invalid Requests to GET by Category', () => {
        beforeAll(() => {
          this.APISupply = {
            name: faker.random.word(),
            url: faker.internet.url(),
            desc: faker.random.words(12),
            examplesOfUse: faker.lorem.words(),
            examplesInUse: faker.internet.url(),
            rating: 'poor',
            tokenRequired: 'yes',
            tokenAccessWaitTime: '36hrs',
            maxReqMin: '20',
            numUsersFav: '3',
            _category: 'music',
          };

          return mocks.user.createOne()
            .then(userData => this.userData = userData)
            .then(() => {
              return superagent.post(':4444/api/newApi')
                .set('Authorization', `Bearer ${this.userData.token}`)
                .send(this.APISupply);
            })
            .then(res => this.res = res);
        });
        test('should return 401 for bad token', () => {
          return superagent.get(`:4444/api/newApi/getAllByCategory/${this.res.body._category}`)
            .set('Authorization', `Bearer ${this.userData.token} + 1`)
            .catch(err => {
              expect(err.status).toBe(401);
            });
        });
        test('should return 401 for invalid category', () => {
          return superagent.get(`:4444/api/newApi/getAllByCategory/monkeys`)
            .set('Authorization', `Bearer ${this.userData.token}`)
            .catch(err => {
              expect(err.status).toBe(404);
            });
        });
        test('should return 404 for bad API ID', () => {
          return superagent.get(`:4444/api/newApi/getAllByCategory/22222`)
            .set('Authorization', `Bearer ${this.userData.token}`)
            .catch(err => {
              expect(err.status).toBe(404);
            });
        });
      });
    });
  });

  // //****************PUTBYID****************
  describe('PUT to /api/newApi', function() {
    describe('Valid Requests to PUT', () => {
      beforeAll(() => {
        this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };
        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => this.res = res);
      });
      test('should return 204 for PUT with valid info', () => {
        return superagent.put(`:4444/api/newApi/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({
            name: faker.random.word(),
            url: faker.internet.url(),
            desc: faker.random.words(12),
            examplesOfUse: faker.lorem.words(),
            examplesInUse: faker.internet.url(),
            rating: 'poor',
            tokenRequired: 'yes',
            tokenAccessWaitTime: '36hrs',
            maxReqMin: '20',
            numUsersFav: '3',
            _category: 'music',
          })
          .then(res => {
            expect(res.status).toBe(204);
          });
      });

    });

    describe('Invalid Requests to PUT ', () => {
      beforeAll(() => {
        this.APISupply = this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };
        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => this.res = res);
      });
      test('should return 401 for PUT with invalid token', () => {
        return superagent.put(`:4444/api/newApi/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token + 1}`)
          .send({
            name: faker.random.word(), url: faker.internet.url(), desc: faker.random.words(12), examplesOfUse: faker.lorem.words(), examplesInUse: faker.internet.url(), rating: 'awesome', tokenRequired: 'yes', tokenAccessWaitTime: '36hrs', maxReqMin: '20', numUsersFav: '3', category: 'entertainment',
          })
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });
      test('should return 404 for PUT with invalid ID', () => {
        return superagent.put(`:4444/api/gallery/${this.res.body._id + 1}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({
            name: faker.random.word(),
            url: faker.internet.url(),
            desc: faker.random.words(12),
            examplesOfUse: faker.lorem.words(),
            examplesInUse: faker.internet.url(),
            rating: 'poor',
            tokenRequired: 'yes',
            tokenAccessWaitTime: '36hrs',
            maxReqMin: '20',
            numUsersFav: '3',
            _category: 'music',
          })
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      test('should return 400 for PUT with invalid body', () => {
        return superagent.put(`:4444/api/gallery/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({ mynameis: 'hello', desc: 'this is a description' })
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });

    });
  });

  // //****************DELETEBYID****************
  describe('DELETE to /api/newApi', function() {
    describe('Valid Requests to DELETE', () => {
      beforeAll(() => {
        this.APISupply = this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => this.res = res);
      });
      test('should return 204 for valid delete', () => {
        return superagent.delete(`:4444/api/newApi/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });

    });

    describe('Invalid Requests to DELETE', () => {
      beforeAll(() => {
        this.APISupply = this.APISupply = {
          name: faker.random.word(),
          url: faker.internet.url(),
          desc: faker.random.words(12),
          examplesOfUse: faker.lorem.words(),
          examplesInUse: faker.internet.url(),
          rating: 'poor',
          tokenRequired: 'yes',
          tokenAccessWaitTime: '36hrs',
          maxReqMin: '20',
          numUsersFav: '3',
          _category: 'music',
        };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/newApi')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.APISupply);
          })
          .then(res => this.res = res);
      });
      test('should return 404 for invalid ID', () => {
        return superagent.delete(`:4444/api/gallery/${this.res.body._id + 1}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      test('should return 401 for invalid token', () => {
        return superagent.delete(`:4444/api/gallery/${this.res.body._id}`)
          .set('Authorization', `Bearer 33335`)
          .catch(err => {
            // console.log(err);
            expect(err.status).toBe(404);
          });
      });

    });
  });
});
