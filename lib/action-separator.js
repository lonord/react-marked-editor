'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionSeparator = function (_Component) {
	_inherits(ActionSeparator, _Component);

	function ActionSeparator() {
		_classCallCheck(this, ActionSeparator);

		return _possibleConstructorReturn(this, (ActionSeparator.__proto__ || Object.getPrototypeOf(ActionSeparator)).apply(this, arguments));
	}

	_createClass(ActionSeparator, [{
		key: 'render',
		value: function render() {
			var styles = {
				wrapper: {
					height: this.props.height,
					width: this.props.width
				},
				sep: {
					height: this.props.height,
					width: this.props.thickness
				}
			};
			return _react2.default.createElement(
				'div',
				{ style: styles.wrapper, className: 'wrapper', 'data-jsx': 1255347590
				},
				_react2.default.createElement('div', { style: styles.sep, className: 'sep', 'data-jsx': 1255347590
				}),
				_react2.default.createElement(_style2.default, {
					styleId: 1255347590,
					css: '.wrapper[data-jsx="1255347590"]{display:table}.sep[data-jsx="1255347590"]{background:#eee;vertical-align:middle;display:table-cell}'
				})
			);
		}
	}]);

	return ActionSeparator;
}(_react.Component);

ActionSeparator.propTypes = {
	thickness: _propTypes2.default.number,
	width: _propTypes2.default.number,
	height: _propTypes2.default.number
};
ActionSeparator.defaultProps = {
	thickness: 1,
	width: 24,
	height: 24
};

exports.default = ActionSeparator;