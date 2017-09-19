'use strict';

const APISupply = require('../model/APISupply');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('APISupply:APISupply');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {
  //************POST************
  router.post('/api/newApi', bearerAuth, (req, res) => {
    debug('POST /api/newApi');

    // http POST (auth token) :5000/api/gallery name='my fancy gallery' desc='it be dabomb'

    req.body.userId = req.user._id;

    return new APISupply(req.body).save()
      .then(api => res.status(201).json(api))
      .catch(err => errorHandler(err, req, res));
  });
  //************GET************
  router.get('/api/newApi/getAllById', bearerAuth, (req, res) => {
    debug('GET /api/gallery/:_id');

    return APISupply.findById(req.params._id)
      .then(api => res.json(api))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/newApi/getAll', (req, res) => {
    debug('GET /api/gallery');

    return APISupply.find()
      .then(api => res.json(api.map(api => api._id)))
      .catch(err => errorHandler(err, req, res));
  });

  //************PUT************
  router.put('/api/newApi', bearerAuth, (req, res) => {
    debug('PUT /api/newApi');

    return APISupply.findById(req.params._id)
      .then(gallery => {
        if(gallery.userId.toString() === req.user._id.toString()) {
          gallery.name = req.body.name || gallery.name;
          gallery.desc = req.body.desc || gallery.desc;
          return gallery.save();
        }
        errorHandler(new Error('authorization failed; user does not own gallery, and cannot update'), req, res);
      })
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });

  //************DELETE************

  router.delete('/api/gallery/:_id', bearerAuth, (req, res) => {
    debug('DELETE /api/gallery');

    return APISupply.findByIdAndRemove(req.params._id)
      .then(gallery => {
        if(gallery.userId.toString() === req.user._id.toString()) return gallery.remove();
        errorHandler(new Error('authorization failed; user does not own gallery, and cannot delete'), req, res);
      })
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
