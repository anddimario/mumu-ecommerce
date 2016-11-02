'use strict';
const mainAppPrefix = module.context.configuration.mainAppPrefix;
const aql = require('@arangodb').aql;
const db = require('@arangodb').db;
const contents = db._collection(mainAppPrefix + 'contents');
const content_access = require('../middlewares/content_access');

module.exports = {
  add (username, informations, id, hostname) {
    // Need to check the permissions
    const permissions = content_access(username, hostname, id);
    if (permissions.type === "success") {
      try {
        contents.update(id, informations);
        return {type: "success"};
      } catch (e) {
        return {type: "error", details: e};
      }
    } else {
      return {type: "error", details: "Bad request"};
    }
  }
};
