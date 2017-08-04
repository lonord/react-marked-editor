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

var ActionButton = function (_Component) {
	_inherits(ActionButton, _Component);

	function ActionButton() {
		_classCallCheck(this, ActionButton);

		return _possibleConstructorReturn(this, (ActionButton.__proto__ || Object.getPrototypeOf(ActionButton)).apply(this, arguments));
	}

	_createClass(ActionButton, [{
		key: 'render',
		value: function render() {
			var styles = {
				wrapper: {
					height: this.props.height,
					width: this.props.width
				},
				btn: {
					height: this.props.height - 2,
					width: this.props.width - 2,
					lineHeight: this.props.width - 2 + 'px'
				}
			};
			return _react2.default.createElement(
				'div',
				{ style: styles.wrapper, className: 'wrapper', title: this.props.title, 'data-jsx': 3598930261
				},
				_react2.default.createElement(
					'div',
					{ className: this.props.isSelect ? 'btn btn-select' : 'btn',
						style: styles.btn, onClick: this.props.onClick, 'data-jsx': 3598930261
					},
					this.props.text ? _react2.default.createElement(
						'i',
						{ className: 'fa ' + (this.props.iconClass ? 'fa-' + this.props.iconClass : '') + ' text-btn', 'data-jsx': 3598930261
						},
						this.props.text
					) : _react2.default.createElement('i', { className: 'fa ' + (this.props.iconClass ? 'fa-' + this.props.iconClass : ''), 'data-jsx': 3598930261
					})
				),
				_react2.default.createElement(_style2.default, {
					styleId: 3598930261,
					css: '.wrapper[data-jsx="3598930261"] {cursor: pointer;}.btn[data-jsx="3598930261"] {border-radius: 3px;border: 1px solid transparent;text-align: center;color: #777;}.btn[data-jsx="3598930261"]:hover {border: 1px solid #eee;background: #fafafa;}.btn-select[data-jsx="3598930261"] {border: 1px solid #eee;background: #f0f0f0;}.text-btn[data-jsx="3598930261"] {font-weight: bold;}'
				})
			);
		}
	}]);

	return ActionButton;
}(_react.Component);

ActionButton.propTypes = {
	text: _propTypes2.default.string,
	iconClass: _propTypes2.default.string,
	width: _propTypes2.default.number,
	height: _propTypes2.default.number,
	onClick: _propTypes2.default.func,
	title: _propTypes2.default.string,
	isSelect: _propTypes2.default.bool
};
ActionButton.defaultProps = {
	iconClass: '',
	width: 24,
	height: 24,
	isSelect: false
};

exports.default = ActionButton;