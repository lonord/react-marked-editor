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

var _actionButton = require('./action-button');

var _actionButton2 = _interopRequireDefault(_actionButton);

var _actionSeparator = require('./action-separator');

var _actionSeparator2 = _interopRequireDefault(_actionSeparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolBar = function (_Component) {
	_inherits(ToolBar, _Component);

	function ToolBar() {
		_classCallCheck(this, ToolBar);

		return _possibleConstructorReturn(this, (ToolBar.__proto__ || Object.getPrototypeOf(ToolBar)).apply(this, arguments));
	}

	_createClass(ToolBar, [{
		key: 'render',
		value: function render() {
			var iconSize = 30;
			var separatorHeight = 12;
			var separatorThickness = 1;
			var separatorPaddingHor = (this.props.height - separatorHeight) / 2;
			var styles = {
				toolbar: {
					lineHeight: this.props.height - 1 + 'px'
				},
				btnWrapper: {
					padding: (this.props.height - 1 - iconSize) / 2 + 'px'
				},
				separator: {
					padding: separatorPaddingHor + 'px 5px ' + separatorPaddingHor + 'px 7px'
				}
			};
			var customButtons = this.props.customButtons || [];
			return _react2.default.createElement(
				'div',
				{
					'data-jsx': 4048827651
				},
				_react2.default.createElement(
					'div',
					{ className: 'toolbar', style: styles.toolbar, 'data-jsx': 4048827651
					},
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Bold',
							iconClass: 'fa-bold', onClick: this.props.onItemClick.bind(this, 'bold') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Strikethrough',
							iconClass: 'fa-strikethrough', onClick: this.props.onItemClick.bind(this, 'remove') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Italic',
							iconClass: 'fa-italic', onClick: this.props.onItemClick.bind(this, 'italic') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Inline code',
							iconClass: 'fa-code', onClick: this.props.onItemClick.bind(this, 'code-inline') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.separator, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionSeparator2.default, { width: separatorThickness, height: separatorHeight })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'H1',
							text: 'H1', onClick: this.props.onItemClick.bind(this, 'h1') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'H2',
							text: 'H2', onClick: this.props.onItemClick.bind(this, 'h2') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'H3',
							text: 'H3', onClick: this.props.onItemClick.bind(this, 'h3') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'H4',
							text: 'H4', onClick: this.props.onItemClick.bind(this, 'h4') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'H5',
							text: 'H5', onClick: this.props.onItemClick.bind(this, 'h5') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'H6',
							text: 'H6', onClick: this.props.onItemClick.bind(this, 'h6') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.separator, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionSeparator2.default, { width: separatorThickness, height: separatorHeight })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Quote',
							iconClass: 'fa-quote-left', onClick: this.props.onItemClick.bind(this, 'quote') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Unordered list',
							iconClass: 'fa-list-ul', onClick: this.props.onItemClick.bind(this, 'ul') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Ordered list',
							iconClass: 'fa-list-ol', onClick: this.props.onItemClick.bind(this, 'ol') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Separate',
							iconClass: 'fa-minus', onClick: this.props.onItemClick.bind(this, 'separate') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.separator, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionSeparator2.default, { width: separatorThickness, height: separatorHeight })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Link',
							iconClass: 'fa-link', onClick: this.props.onItemClick.bind(this, 'link') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Image',
							iconClass: 'fa-picture-o', onClick: this.props.onItemClick.bind(this, 'image') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Code block',
							iconClass: 'fa-file-code-o', onClick: this.props.onItemClick.bind(this, 'code') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize, title: 'Table',
							iconClass: 'fa-table', onClick: this.props.onItemClick.bind(this, 'table') })
					),
					customButtons.length > 0 ? _react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.separator, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionSeparator2.default, { width: separatorThickness, height: separatorHeight })
					) : null,
					customButtons.map(function (btn, idx) {
						return _react2.default.createElement(
							'div',
							{ className: 'btn-wrapper', style: styles.btnWrapper, key: idx + 1, 'data-jsx': 4048827651
							},
							_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize,
								title: btn.title, text: btn.text,
								iconClass: btn.icon, onClick: btn._onClick })
						);
					}),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.separator, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionSeparator2.default, { width: separatorThickness, height: separatorHeight })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize,
							title: 'Editor only', isSelect: this.props.showType == 'editor',
							iconClass: 'fa-terminal', onClick: this.props.onItemClick.bind(this, 'state-editor') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize,
							title: 'Editor and preview', isSelect: this.props.showType == 'both',
							iconClass: 'fa-columns', onClick: this.props.onItemClick.bind(this, 'state-both') })
					),
					_react2.default.createElement(
						'div',
						{ className: 'btn-wrapper', style: styles.btnWrapper, 'data-jsx': 4048827651
						},
						_react2.default.createElement(_actionButton2.default, { width: iconSize, height: iconSize,
							title: 'Preview only', isSelect: this.props.showType == 'view',
							iconClass: 'fa-eye', onClick: this.props.onItemClick.bind(this, 'state-view') })
					)
				),
				_react2.default.createElement(_style2.default, {
					styleId: 4048827651,
					css: '.toolbar[data-jsx="4048827651"] {box-sizing: border-box;border-bottom: 1px solid #eee;padding: 0px 10px;}.btn-wrapper[data-jsx="4048827651"] {display: inline-block;vertical-align: middle;}'
				})
			);
		}
	}]);

	return ToolBar;
}(_react.Component);

ToolBar.propTypes = {
	height: _propTypes2.default.number,
	onItemClick: _propTypes2.default.func,
	customButtons: _propTypes2.default.array,
	showType: _propTypes2.default.oneOf(['editor', 'both', 'view'])
};

exports.default = ToolBar;