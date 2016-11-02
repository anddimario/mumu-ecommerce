/*global describe, it */
'use strict';
const mainAppPrefix = module.context.configuration.mainAppPrefix;
const expect = require('chai').expect;
const stock_routes = require('../routes/stock');
const db = require('@arangodb').db;
const contents = db._collection(mainAppPrefix + 'contents');

const mainSite = module.context.configuration.sites.hostnames[0];
const payload_create = {
  slug: "test-slug",
  content: "test content<br>",
  type: "product",
  owner: "test_contents",
  write: "writer,publisher"
};
const payload_add = {
  quantity: 10,
  price: 55.00
};


describe('stock', function () {
  
  before('create a test content', function () {
    contents.save(payload_create);
  });
  
  it('add', function () {
    // Get the id for the content added
    let product = contents.firstExample(payload_create);
    let response = stock_routes.add(payload_create.owner, payload_add, product._id, mainSite);
    expect(response.type).to.equal("success");
  }); 
  
  // After all tests
  after('delete the created content', function () {
    contents.removeByExample({
      hostname: mainSite,
      slug: payload_create.slug
    });
  });
  
});
