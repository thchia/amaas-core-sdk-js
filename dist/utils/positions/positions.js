'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieve = retrieve;
exports.search = search;
exports._parsePos = _parsePos;

var _network = require('../network');

var _position = require('../../transactions/Positions/position.js');

var _position2 = _interopRequireDefault(_position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function retrieve(_ref, callback) {
  var AMId = _ref.AMId,
      resourceId = _ref.resourceId,
      token = _ref.token;

  var params = {
    AMaaSClass: 'positions',
    AMId: AMId,
    resourceId: resourceId,
    token: token
  };
  (0, _network.retrieveData)(params, function (error, result) {
    if (error) {
      callback(error);
    } else {
      var pos = _parsePos(result);
      callback(null, pos);
    }
  });
}

function search(_ref2, callback) {
  var queryKey = _ref2.queryKey,
      queryValue = _ref2.queryValue,
      token = _ref2.token;

  var params = {
    AMaaSClass: 'positions',
    queryKey: queryKey,
    queryValue: queryValue,
    token: token
  };
  (0, _network.searchData)(params, function (error, result) {
    if (error) {
      callback(error);
    } else {
      var positions = result.map(function (pos) {
        return _parsePos(pos);
      });
      callback(null, positions);
    }
  });
}

function _parsePos(pos) {
  return new _position2.default({
    createdBy: pos.created_by,
    updatedBy: pos.updated_by,
    createdTime: pos.created_time,
    updatedTime: pos.updated_time,
    version: pos.version,
    assetManagerId: pos.asset_manager_id,
    assetBookId: pos.asset_book_id,
    assetId: pos.asset_id,
    quantity: pos.quantity,
    validFrom: pos.valid_from,
    internalId: pos.internal_id,
    validTo: pos.valid_to,
    clientId: pos.client_id,
    accountingType: pos.accounting_type,
    accountId: pos.account_id
  });
}