'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieve = retrieve;
exports.insert = insert;
exports.amend = amend;
exports.partialAmend = partialAmend;
exports.deactivate = deactivate;
exports._parseChildren = _parseChildren;
exports._parseParty = _parseParty;

var _network = require('../network');

var _party = require('../../parties/Party/party.js');

var _party2 = _interopRequireDefault(_party);

var _individual = require('../../parties/Individual/individual.js');

var _individual2 = _interopRequireDefault(_individual);

var _organisation = require('../../parties/Organisation/organisation.js');

var _organisation2 = _interopRequireDefault(_organisation);

var _company = require('../../parties/Company/company.js');

var _company2 = _interopRequireDefault(_company);

var _broker = require('../../parties/Broker/broker.js');

var _broker2 = _interopRequireDefault(_broker);

var _exchange = require('../../parties/Exchange/exchange.js');

var _exchange2 = _interopRequireDefault(_exchange);

var _fund = require('../../parties/Fund/fund.js');

var _fund2 = _interopRequireDefault(_fund);

var _governmentAgency = require('../../parties/GovernmentAgency/governmentAgency.js');

var _governmentAgency2 = _interopRequireDefault(_governmentAgency);

var _address = require('../../parties/Children/address.js');

var _address2 = _interopRequireDefault(_address);

var _email = require('../../parties/Children/email.js');

var _email2 = _interopRequireDefault(_email);

var _Reference = require('../../core/Reference/Reference.js');

var _Reference2 = _interopRequireDefault(_Reference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieve Party data for specified AMId and partyId
 * @param {number} AMId - Asset Manager ID of the Party
 * @param {string} [partyId] - Party ID of the Party. Omitting this will return all Parties associated with that AMId
 * @param {function} callback - Called with two arguments (error, result) on completion
 */
function retrieve(_ref, callback) {
  var AMId = _ref.AMId,
      partyId = _ref.partyId,
      token = _ref.token;

  var params = {
    AMaaSClass: 'parties',
    AMId: AMId,
    resourceId: partyId,
    token: token
  };
  (0, _network.retrieveData)(params, function (error, result) {
    if (error) {
      callback(error);
    } else {
      if (!Array.isArray(result)) {
        callback(null, _parseParty(result));
        return;
      }
      var parties = result.map(function (party) {
        return _parseParty(party);
      });
      callback(null, parties);
    }
  });
}

/**
 * Insert a new Party into the database
 * @param {Party} party - Party instance to insert
 * @param {function} callback - Called with two arguments (error, result) on completion
 */
function insert(_ref2, callback) {
  var party = _ref2.party,
      token = _ref2.token;

  var stringified = JSON.stringify(party);
  var params = {
    AMaaSClass: 'parties',
    data: JSON.parse(stringified),
    token: token
  };
  (0, _network.insertData)(params, function (error, result) {
    _handleCallback(error, result, callback);
  });
}

/**
 * Amend an existing Party. WARNING: This makes a HTTP PUT request and will replace the existing Party with the one passed in
 * @param {Party} party - Amended Party instance to PUT
 * @param {number} AMId - AMId of the Party to amend
 * @param {string} resourceId - Party ID of the Party to amend
 * @param {function} callback - Called with two arguments (error, result) on completion
 */
function amend(_ref3, callback) {
  var party = _ref3.party,
      AMId = _ref3.AMId,
      resourceId = _ref3.resourceId,
      token = _ref3.token;

  var stringified = JSON.stringify(party);
  var params = {
    AMaaSClass: 'parties',
    AMId: AMId,
    resourceId: resourceId,
    data: JSON.parse(stringified),
    token: token
  };
  (0, _network.putData)(params, function (error, result) {
    _handleCallback(error, result, callback);
  });
}

/**
 * Partially amend an existing Party. WARNING: The changes object should be keyed in snake case (e.g. party_id instead of partyId)
 * @param {object} changes - Object of changes to the Party. Keys must be snake cased form of Party properties
 * @param {string} AMId - AMId of the Party to be partially amended
 * @param {string} resourceId - Party ID of the Party to be partially amended
 * @param {function} callback - Called with two arguments (error, result) on completion
 */
function partialAmend(_ref4, callback) {
  var changes = _ref4.changes,
      AMId = _ref4.AMId,
      resourceId = _ref4.resourceId,
      token = _ref4.token;

  var params = {
    AMaaSClass: 'parties',
    AMId: AMId,
    resourceId: resourceId,
    data: changes,
    token: token
  };
  (0, _network.patchData)(params, function (error, result) {
    _handleCallback(error, result, callback);
  });
}

/**
 * Delete an exising Party. This will set the Party status to 'Inactive'.
 * @param {string} AMId - AMId of the Party to be deleted
 * @param {string} resourceId - Party ID of the Party to be deleted
 * @param {function} callback - Called with two arguments (error, result) on completion
 */
function deactivate(_ref5, callback) {
  var AMId = _ref5.AMId,
      resourceId = _ref5.resourceId,
      token = _ref5.token;

  var params = {
    AMaaSClass: 'parties',
    AMId: AMId,
    resourceId: resourceId,
    token: token
  };
  (0, _network.deleteData)(params, function (error, result) {
    _handleCallback(error, result, callback);
  });
}

function _parseChildren(type, children) {
  var parsedChildren = {};
  switch (type) {
    case 'address':
      for (var child in children) {
        if (children.hasOwnProperty(child)) {
          parsedChildren[child] = new _address2.default({
            addressPrimary: children[child].address_primary,
            lineOne: children[child].line_one,
            lineTwo: children[child].line_two,
            city: children[child].city,
            region: children[child].region,
            postalCode: children[child].postal_code,
            countryId: children[child].country_id,
            active: children[child].active,
            createdBy: children[child].created_by,
            updatedBy: children[child].updated_by,
            createdTime: children[child].created_time,
            updatedTime: children[child].updated_time,
            version: children[child].version
          });
        }
      }
      break;
    case 'email':
      for (var _child in children) {
        parsedChildren[_child] = new _email2.default({
          emailPrimary: children[_child].email_primary,
          email: children[_child].email,
          active: children[_child].active,
          createdBy: children[_child].created_by,
          updatedBy: children[_child].updated_by,
          createdTime: children[_child].created_time,
          updatedTime: children[_child].updated_time,
          version: children[_child].version
        });
      }
      break;
    case 'reference':
      for (var _child2 in children) {
        parsedChildren[_child2] = new _Reference2.default({
          referenceValue: children[_child2].reference_value,
          active: children[_child2].active,
          createdBy: children[_child2].created_by,
          updatedBy: children[_child2].updated_by,
          createdTime: children[_child2].created_time,
          updatedTime: children[_child2].updated_time,
          version: children[_child2].version
        });
      }
      break;
    default:
      throw new Error('Child type not defined (parseChildren)');
  }
  return parsedChildren;
}

function _parseParty(object) {
  var party = void 0;
  var addresses = _parseChildren('address', object.addresses);
  var emails = _parseChildren('email', object.emails);
  var references = _parseChildren('reference', object.references);
  switch (object.party_type) {
    case 'Individual':
      party = new _individual2.default({
        assetManagerId: object.asset_manager_id,
        partyId: object.party_id,
        partyStatus: object.party_status,
        partyClass: object.party_class,
        partyType: object.party_type,
        description: object.description,
        addresses: addresses,
        emails: emails,
        references: references,
        createdBy: object.created_by,
        updatedBy: object.updated_by,
        createdTime: object.created_time,
        updatedTime: object.updated_time,
        version: object.version
      });
      break;
    case 'Broker':
      party = new _broker2.default({
        assetManagerId: object.asset_manager_id,
        partyId: object.party_id,
        partyStatus: object.party_status,
        partyClass: object.party_class,
        partyType: object.party_type,
        description: object.description,
        addresses: addresses,
        emails: emails,
        references: references,
        createdBy: object.created_by,
        updatedBy: object.updated_by,
        createdTime: object.created_time,
        updatedTime: object.updated_time,
        version: object.version
      });
      break;
    case 'Exchange':
      party = new _exchange2.default({
        assetManagerId: object.asset_manager_id,
        partyId: object.party_id,
        partyStatus: object.party_status,
        partyClass: object.party_class,
        partyType: object.party_type,
        description: object.description,
        addresses: addresses,
        emails: emails,
        references: references,
        createdBy: object.created_by,
        updatedBy: object.updated_by,
        createdTime: object.created_time,
        updatedTime: object.updated_time,
        version: object.version
      });
      break;
    case 'Fund':
      party = new _fund2.default({
        assetManagerId: object.asset_manager_id,
        partyId: object.party_id,
        partyStatus: object.party_status,
        partyClass: object.party_class,
        partyType: object.party_type,
        description: object.description,
        addresses: addresses,
        emails: emails,
        references: references,
        createdBy: object.created_by,
        updatedBy: object.updated_by,
        createdTime: object.created_time,
        updatedTime: object.updated_time,
        version: object.version
      });
      break;
    case 'GovernmentAgency':
      party = new _governmentAgency2.default({
        assetManagerId: object.asset_manager_id,
        partyId: object.party_id,
        partyStatus: object.party_status,
        partyClass: object.party_class,
        partyType: object.party_type,
        description: object.description,
        addresses: addresses,
        emails: emails,
        references: references,
        createdBy: object.created_by,
        updatedBy: object.updated_by,
        createdTime: object.created_time,
        updatedTime: object.updated_time,
        version: object.version
      });
      break;
    case 'Organisation':
      party = new _organisation2.default({
        assetManagerId: object.asset_manager_id,
        partyId: object.party_id,
        partyStatus: object.party_status,
        partyClass: object.party_class,
        partyType: object.party_type,
        description: object.description,
        addresses: addresses,
        emails: emails,
        references: references,
        createdBy: object.created_by,
        updatedBy: object.updated_by,
        createdTime: object.created_time,
        updatedTime: object.updated_time,
        version: object.version
      });
      break;
    case 'Company':
      party = new _company2.default({
        assetManagerId: object.asset_manager_id,
        partyId: object.party_id,
        partyStatus: object.party_status,
        partyClass: object.party_class,
        partyType: object.party_type,
        description: object.description,
        addresses: addresses,
        emails: emails,
        references: references,
        createdBy: object.created_by,
        updatedBy: object.updated_by,
        createdTime: object.created_time,
        updatedTime: object.updated_time,
        version: object.version
      });
      break;
    default:
      party = new _party2.default({
        assetManagerId: object.asset_manager_id,
        partyId: object.party_id,
        partyStatus: object.party_status,
        partyClass: object.party_class,
        partyType: object.party_type,
        description: object.description,
        addresses: addresses,
        emails: emails,
        references: references,
        createdBy: object.created_by,
        updatedBy: object.updated_by,
        createdTime: object.created_time,
        updatedTime: object.updated_time,
        version: object.version
      });
  }
  return party;
}

function _handleCallback(error, result, callback) {
  if (error) {
    callback(error);
  } else {
    callback(null, result);
  }
}

// export default getParty