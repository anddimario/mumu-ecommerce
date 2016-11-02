'use strict';
// Global requirements
const joi = require('joi');
const createRouter = require('@arangodb/foxx/router');
const sessionsMiddleware = require('@arangodb/foxx/sessions');
const jwtStorage = require('@arangodb/foxx/sessions/storages/jwt');
const stock_models = require('./models/stock');
const stock_routes = require('./routes/stock');

// Pass in a secure secret from the Foxx configuration
const secret = module.context.configuration.jwtSecret;
const sessions = sessionsMiddleware({
  storage: jwtStorage(secret),
  transport: 'header'
});
module.context.use(sessions);

/* Middlewares */
module.context.use(function (req, res, next) {
  let valid = check_hostname(req.hostname);
  if (valid.type === "error") {
    res.throw(404, 'Not found');
  }
  next();
});

const router = createRouter();
module.context.use(router);

// Add a stock for the content
router.put('/stock', function (req, res) {
  let creation = stock_routes.add(req.body, req.hostname);
  if (creation.type === "success") {
    res.send({success: true});
  } else {
    res.throw('bad request', creation.details);
  }
})
.body(joi.object(stock_models.add).required(), 'Informations')
.description('Add a stock for the content.');
