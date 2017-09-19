'use strict';

const APISupply = require('../model/APISupply');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('APISupply:APISupply');
const bearerAuth = require('../lib/bearer-auth-middleware');
const jsonParser = require('body-parser').json();

module.exports = function(router) {
  //************POST************
  router.post('/api/newApi', bearerAuth, jsonParser, (req, res) => {
    debug('POST /api/newApi');

    // http POST (auth token) :5000/api/gallery name='my fancy gallery' desc='it be dabomb'

    req.body.userId = req.user._id;

    return new APISupply(req.body).save()
      .then(api => res.status(201).json(api))
      .catch(err => errorHandler(err, req, res));
  });
  //************GET************
  router.get('/api/newApi/getAllById/:_id', bearerAuth, (req, res) => {
    debug('GET /api/newApi/:_id');

    return APISupply.findById(req.params._id)
      .then(api => res.json(api))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/newApi/getAllByCategory/:_category', bearerAuth, (req, res) => {
    debug('GET /api/newApi/:_category');

    return APISupply.find({ 'category': req.params._category})
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
  router.put('/api/newApi/:_id', bearerAuth, (req, res) => {
    debug('PUT /api/newApi');

    return APISupply.findById(req.params._id)
      .then(api => {
        if(api.userId.toString() === req.user._id.toString()) {
          api.name = req.body.name || api.name;
          api.url = req.body.url || api.url;
          api.desc = req.body.desc || api.desc;
          api.examplesOfUse = req.body.examplesOfUse || api.examplesOfUse;
          api.examplesInUse = req.body.examplesInUse || api.examplesInUse;
          api.rating = req.body.rating || api.rating;
          api.tokenRequired = req.body.tokenRequired || api.tokenRequired;
          api.tokenAccessWaitTime = req.body.tokenAccessWaitTime || api.tokenAccessWaitTime;
          api.maxReqMin = req.body.maxReqMin || api.maxReqMin;
          api.numUsersFav = req.body.numUsersFav || api.numUsersFav;
          api.category = req.body.category || api.category;


          return api.save();
        }
        errorHandler(new Error('authorization failed; user does not have access to update'), req, res);
      })
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });

  //************DELETE************
  //TODO: need to figure out how to remove apis from users favorites
  router.delete('/api/newApi/:_id', bearerAuth, (req, res) => {
    debug('DELETE /api/newApi');

    return APISupply.findByIdAndRemove(req.params._id)
      // .then(api => {
      //   let api.favorites = x
      //   Users.findBy
      //   if users.favorites
      //   if(api.favorites.toString() === req.user._id.toString()) return api.remove();
      //   errorHandler(new Error('authorization failed; user does not own api, and cannot delete'), req, res);
      // })
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
