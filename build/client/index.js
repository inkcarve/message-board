'use strict';

var _routes = require('../shared/routes.jsx');

var _routes2 = _interopRequireDefault(_routes);

require('./scss/style.scss');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_routes2.default, document.getElementById('app'));