'use strict';

var _routes = require('../shared/routes.jsx');

var _routes2 = _interopRequireDefault(_routes);

require('./scss/style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(_routes2.default, document.getElementById('app'));