'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
// const Gallery = require('../../model/gallery');
require('jest');

xdescribe('Testing Gallery Routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.gallery.removeAll);
  afterEach(mocks.user.removeAll);

  describe('POST to /api/gallery', function() {
    describe('Valid Requests', () => {
      beforeAll(() => {
        this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/gallery')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeGalleryData);
          })
          .then(res => this.res = res);
      });

      test('should return a status of 201', () => {
        expect(this.res.status).toBe(200);
      });
      test('should return a new gallery in the res', () => {
        expect(this.res.body.name).toBe(this.fakeGalleryData.name);
        expect(this.res.body.desc).toBe(this.fakeGalleryData.desc);
      });
      test('should have a userId property', () => {
        expect(this.res.body).toHaveProperty('userId');
        expect(this.res.body.userId.toString()).toBe(this.userData.user._id.toString());
      });
    });

    describe('Invalid Requests', () => {
      test('should return a status of 401 given no Auth credentials',  () => {
        return superagent.post(':4444/api/gallery')
          .send(this.fakeGalleryData)
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });

      test('should return a 401 given bad Auth credintials', () => {
        return superagent.post(':4444/api/gallery')
          .set('Authorization', 'Bearer badToken')
          .send(this.fakeGalleryData)
          .catch(err => {
            expect(err.status).toBe(401);
          });
      });

      xtest('should return 400 given bad req body', () => {
        return superagent.post(':4444/api/gallery')
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({})
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
  });

  describe('GET to /api/gallery', function() {
    describe('Valid Requests to GETALL', () => {
      beforeAll(() => {
        this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/gallery')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeGalleryData);
          })
          .then(res => this.res = res);
      });
      test('should return 200 for valid GETALL requests', () => {
        return superagent.get(':4444/api/gallery')
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });

    describe('Invalid Requests', () => {
      beforeAll(() => {
        this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/gallery')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeGalleryData);
          })
          .then(res => this.res = res);
      });
      test('should return 401 for bad token', () => {
        return superagent.get(':4444/api/gallery')
          .set('Authorization', `Bearer ${this.userData.token} +1`)
          .then(res => {
            expect(res.status).toBe(401);
          });
      });
    });
  });
  describe('GET to /api/gallery', function() {
    describe('Valid Requests to GET', () => {
      beforeAll(() => {
        this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/gallery')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeGalleryData);
          })
          .then(res => this.res = res);
      });
      test('should return 200 for valid GET requests', () => {
        return superagent.get(`:4444/api/gallery/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      describe('Invalid Requests to GET', () => {
        beforeAll(() => {
          this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

          return mocks.user.createOne()
            .then(userData => this.userData = userData)
            .then(() => {
              return superagent.post(':4444/api/gallery')
                .set('Authorization', `Bearer ${this.userData.token}`)
                .send(this.fakeGalleryData);
            })
            .then(res => this.res = res);
        });
        test('should return 401 for bad token', () => {
          return superagent.get(`:4444/api/gallery/${this.res.body._id}`)
            .set('Authorization', `Bearer ${this.userData.token} + 1`)
            .then(res => {
              expect(res.status).toBe(401);
            });
        });
        test('should return 404 for bad gallery ID', () => {
          return superagent.get(`:4444/api/gallery/22222`)
            .set('Authorization', `Bearer ${this.userData.token}`)
            .then(res => {
              expect(res.status).toBe(404);
            });
        });
      });
    });
  });

  describe('PUT to /api/gallery', function() {
    describe('Valid Requests to PUT', () => {
      beforeAll(() => {
        this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/gallery')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeGalleryData);
          })
          .then(res => this.res = res);
      });
      test('should return 204 for PUT with valid info', () => {
        return superagent.put(`:4444/api/gallery/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({ name: 'hello', desc: 'this is a description' })
          .then(res => {
            expect(res.status).toBe(204);
          });
      });

    });

    describe('Invalid Requests to PUT', () => {
      beforeAll(() => {
        this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/gallery')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeGalleryData);
          })
          .then(res => this.res = res);
      });
      test('should return 401 for PUT with invalid token', () => {
        return superagent.put(`:4444/api/gallery/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token + 1}`)
          .send({ name: 'hello', desc: 'this is a description' })
          .then(res => {
            expect(res.status).toBe(401);
          });
      });
      test('should return 404 for PUT with invalid ID', () => {
        return superagent.put(`:4444/api/gallery/${this.res.body._id + 1}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({ name: 'hello', desc: 'this is a description' })
          .then(res => {
            expect(res.status).toBe(404);
          });
      });
      test('should return 400 for PUT with invalid body', () => {
        return superagent.put(`:4444/api/gallery/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .send({ mynameis: 'hello', desc: 'this is a description' })
          .then(res => {
            expect(res.status).toBe(400);
          });
      });

    });
  });

  describe('DELETE to /api/gallery', function() {
    describe('Valid Requests to DELETE', () => {
      beforeAll(() => {
        this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/gallery')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeGalleryData);
          })
          .then(res => this.res = res);
      });
      test('should return 204 for valid delete', () => {
        return superagent.delete(`:4444/api/gallery/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });

    });

    describe('Invalid Requests to DELETE', () => {
      beforeAll(() => {
        this.fakeGalleryData = { name: faker.random.word(), desc: faker.random.words(12) };

        return mocks.user.createOne()
          .then(userData => this.userData = userData)
          .then(() => {
            return superagent.post(':4444/api/gallery')
              .set('Authorization', `Bearer ${this.userData.token}`)
              .send(this.fakeGalleryData);
          })
          .then(res => this.res = res);
      });
      test('should return xxx for invalid ID', () => {
        return superagent.delete(`:4444/api/gallery/${this.res.body._id + 1}`)
          .set('Authorization', `Bearer ${this.userData.token}`)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
      test('should return xxx for invalid token', () => {
        return superagent.delete(`:4444/api/gallery/${this.res.body._id}`)
          .set('Authorization', `Bearer ${this.userData.token + 1}`)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });

    });
  });
});
