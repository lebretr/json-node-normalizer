const { normalize, normalizePath } = require('./core/normalizer');
const { NodeTypes } = require('./core/types');
const { oasFlatten } = require('./core/oasFlatter');

module.exports = {
  normalize,
  normalizePath,
  NodeTypes,
  oasFlatten
};
