'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _party = require('../Party/party.js');

var _party2 = _interopRequireDefault(_party);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing an Individual
 * @extends Party
 */
var Individual = function (_Party) {
  _inherits(Individual, _Party);

  /**
   * Construct a new Individual object
   * @param {object} params - Individual creation options
   * @param {number} params.assetManagerId - Asset Manager ID of the Individual
   * @param {string} params.partyId - Party ID of the Individual
   * @param {string} params.partyStatus=Active - Status of the Individual (e.g. 'Active')
   * @param {string} params.partyClass=Individual - Class of the Individual
   * @param {string} params.partyType=Individual - Type of the Individual
   * @param {string} params.description - Description of the Individual
   * @param {object} params.addresses - Object of Addresses associated with this Individual
   * @param (object) params.emails - Object of Emails associated with this Individual
   * @param {object} params.references - Object of References associated with this Individual
   * @param {string} params.createdBy - ID of the user that created the Individual (required if creating a new Individual)
   * @param {string} params.updatedBy - ID of the user that updated the Individual (use if amending existing Individual)
   * @param {date} params.createdTime - Time that the Individual was created (required if creating new Individual)
   * @param {date} params.updatedTime - Time that the Individual was updated (required if amending existing Individual)
   * @param {number} params.version - Version number of the Individual
   */
  function Individual(_ref) {
    var assetManagerId = _ref.assetManagerId,
        partyId = _ref.partyId,
        _ref$partyStatus = _ref.partyStatus,
        partyStatus = _ref$partyStatus === undefined ? 'Active' : _ref$partyStatus,
        _ref$partyClass = _ref.partyClass,
        partyClass = _ref$partyClass === undefined ? 'Individual' : _ref$partyClass,
        _ref$partyType = _ref.partyType,
        partyType = _ref$partyType === undefined ? 'Individual' : _ref$partyType,
        _ref$description = _ref.description,
        description = _ref$description === undefined ? '' : _ref$description,
        _ref$addresses = _ref.addresses,
        addresses = _ref$addresses === undefined ? {} : _ref$addresses,
        _ref$emails = _ref.emails,
        emails = _ref$emails === undefined ? {} : _ref$emails,
        _ref$references = _ref.references,
        references = _ref$references === undefined ? {} : _ref$references,
        createdBy = _ref.createdBy,
        updatedBy = _ref.updatedBy,
        createdTime = _ref.createdTime,
        updatedTime = _ref.updatedTime,
        version = _ref.version;

    _classCallCheck(this, Individual);

    return _possibleConstructorReturn(this, (Individual.__proto__ || Object.getPrototypeOf(Individual)).call(this, {
      assetManagerId: assetManagerId,
      partyId: partyId,
      partyStatus: partyStatus,
      partyClass: partyClass,
      partyType: partyType,
      description: description,
      addresses: addresses,
      emails: emails,
      references: references,
      createdBy: createdBy,
      updatedBy: updatedBy,
      createdTime: createdTime,
      updatedTime: updatedTime,
      version: version
    }));
  }

  _createClass(Individual, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        asset_manager_id: this.assetManagerId,
        party_id: this.partyId,
        party_status: this.partyStatus,
        party_class: this.partyClass,
        party_type: this.partyType,
        description: this.description,
        addresses: this.addresses,
        emails: this.emails,
        references: this.references,
        created_by: this.createdBy,
        created_time: this.createdTime,
        updated_by: this.updatedBy,
        updated_time: this.updatedTime,
        version: this.version
      };
    }
  }]);

  return Individual;
}(_party2.default);

exports.default = Individual;