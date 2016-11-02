'use strict';

const joi = require('joi');

module.exports = {
  add: {
    quantity: joi.number().required(),
    price: joi.number().required()
  }
  
}
