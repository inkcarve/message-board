'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('../../../message.json');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenewData = function () {
  function RenewData() {
    _classCallCheck(this, RenewData);

    this.data = _message2.default;
  }

  _createClass(RenewData, [{
    key: 'getData',
    value: function getData() {
      return this.data;
    }
  }, {
    key: 'renew',
    value: function renew(newData) {
      if (newData !== undefined) this.data = newData;
      return _message2.default;
    }
  }]);

  return RenewData;
}();

exports.default = new RenewData();