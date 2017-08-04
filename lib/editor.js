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

var _codemirrorWrapper = require('./codemirror-wrapper');

var _codemirrorWrapper2 = _interopRequireDefault(_codemirrorWrapper);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _markedView = require('./marked-view');

var _markedView2 = _interopRequireDefault(_markedView);

var _scrollHelper = require('./util/scroll-helper');

var _scrollHelper2 = _interopRequireDefault(_scrollHelper);

var _textReplacer = require('./util/text-replacer');

var _textReplacer2 = _interopRequireDefault(_textReplacer);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactMarkedEditor = function (_Component) {
	_inherits(ReactMarkedEditor, _Component);

	function ReactMarkedEditor(props) {
		_classCallCheck(this, ReactMarkedEditor);

		var _this = _possibleConstructorReturn(this, (ReactMarkedEditor.__proto__ || Object.getPrototypeOf(ReactMarkedEditor)).call(this, props));

		_this.state = {
			markdown: props.initialMarkdown || '',
			showType: 'both'
		};
		_this.scrollHelper = null;
		_this.replacer = null;
		_this.handleEditorTextChange = (0, _lodash2.default)(_this.handleEditorTextChange.bind(_this), 500);
		_this.onEditorValueChange = _this.onEditorValueChange.bind(_this);
		return _this;
	}

	_createClass(ReactMarkedEditor, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			setTimeout(function () {
				_this2.codeDoc = _codemirrorWrapper2.default.fromTextArea(_this2.refs.mdEditor, {
					mode: 'gfm',
					lineNumbers: true
				});
				_this2.scrollHelper = new _scrollHelper2.default(_this2.codeDoc, _this2.refs.mdView);
				_this2.replacer = new _textReplacer2.default(_this2.codeDoc);
				_this2.codeDoc.setValue(_this2.state.markdown);
				_this2.codeDoc.on('change', _this2.onEditorValueChange);
			}, 1);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.codeDoc) {
				this.codeDoc.off('change', this.onEditorValueChange);
				this.codeDoc.setValue('');
				this.codeDoc = null;
			}
			this.refs.mdEditor.innerHTML = '';
			this.scrollHelper && this.scrollHelper.destory();
			this.replacer && this.replacer.destory();
			this.scrollHelper = null;
			this.replacer = null;
		}
	}, {
		key: 'onEditorValueChange',
		value: function onEditorValueChange() {
			this.props.onChange && this.props.onChange(this.codeDoc.getValue());
			this.handleEditorTextChange();
		}
	}, {
		key: 'handleEditorTextChange',
		value: function handleEditorTextChange() {
			this.setState({
				markdown: this.codeDoc.getValue()
			});
		}
	}, {
		key: 'handleToolbarAction',
		value: function handleToolbarAction(actionType) {
			if (actionType == 'state-editor') {
				this.setState({
					showType: 'editor'
				});
				return;
			}
			if (actionType == 'state-both') {
				this.setState({
					showType: 'both'
				});
				return;
			}
			if (actionType == 'state-view') {
				this.setState({
					showType: 'view'
				});
				return;
			}
			this.replacer && this.replacer.replace(actionType);
		}
	}, {
		key: 'handleCustomButtonClick',
		value: function handleCustomButtonClick(fn, event) {
			fn(this.codeDoc, event);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    markdownClassName = _props.markdownClassName,
			    markdownStyle = _props.markdownStyle,
			    editorHeight = _props.editorHeight,
			    hideToolbar = _props.hideToolbar,
			    toolbarCustomButtons = _props.toolbarCustomButtons;

			var styles = {
				wrapper: {
					height: editorHeight
				}
			};
			var editorClass = 'blockLeft';
			var viewClass = 'blockRight mdShow';
			switch (this.state.showType) {
				case 'editor':
					editorClass += ' blockFull';
					viewClass += ' blockHide';
					break;
				case 'view':
					editorClass += ' blockHide';
					viewClass += ' blockFull';
					break;
			}
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = toolbarCustomButtons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var btn = _step.value;

					btn._onClick = this.handleCustomButtonClick.bind(this, btn.onClick);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return _react2.default.createElement(
				'div',
				{ style: this.props.style, className: this.props.className, 'data-jsx': 2367950479
				},
				!hideToolbar ? _react2.default.createElement(_toolbar2.default, {
					height: 40,
					showType: this.state.showType,
					customButtons: toolbarCustomButtons,
					onItemClick: this.handleToolbarAction.bind(this) }) : null,
				_react2.default.createElement(
					'div',
					{ className: 'wrapper', style: styles.wrapper, 'data-jsx': 2367950479
					},
					_react2.default.createElement(
						'div',
						{ className: editorClass, 'data-jsx': 2367950479
						},
						_react2.default.createElement('textarea', { ref: 'mdEditor', hidden: true, 'data-jsx': 2367950479
						})
					),
					_react2.default.createElement(
						'div',
						{ className: viewClass, ref: 'mdView', 'data-jsx': 2367950479
						},
						_react2.default.createElement(
							'div',
							{ className: 'marked-view-wrapper', 'data-jsx': 2367950479
							},
							_react2.default.createElement(_markedView2.default, {
								markdown: this.state.markdown,
								style: markdownStyle,
								markdownClass: markdownClassName })
						)
					)
				),
				_react2.default.createElement(_style2.default, {
					styleId: 1855989738,
					css: '.wrapper[data-jsx="2367950479"]{box-sizing:border-box}.blockLeft[data-jsx="2367950479"]{box-sizing:border-box;width:50%;height:100%;float:left}.blockRight[data-jsx="2367950479"]{box-sizing:border-box;width:50%;height:100%;float:left}.blockFull[data-jsx="2367950479"]{width:100% !important}.blockHide[data-jsx="2367950479"]{display:none !important}.mdShow[data-jsx="2367950479"]{display:block;overflow-y:scroll;overflow-x:hidden}.mdShow[data-jsx="2367950479"]::-webkit-scrollbar{-webkit-appearance:none;background-color:#f4f4f4;width:6px;height:6px}.mdShow[data-jsx="2367950479"]::-webkit-scrollbar-thumb{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background-color:#e2e2e2}.marked-view-wrapper[data-jsx="2367950479"]{padding:10px 15px}'
				}),
				_react2.default.createElement(_style2.default, {
					styleId: 1836844064,
					css: '.CodeMirror{font-family:monospace;height:100%;color:black}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-scrollbar-filler,.CodeMirror-gutter-filler{background-color:white}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:black}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid black;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0 !important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-animate-fat-cursor{width:auto;border:0;-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;-webkit-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite;background-color:#7e7}@-moz-keyframes blink50%{background-color:transparent}@-webkit-keyframes blink50%{background-color:transparent}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:-20px;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:blue}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:bold}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta{color:#555}.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-s-default .cm-error{color:#f00}.cm-invalidchar{color:#f00}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0f0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#f22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:white}.CodeMirror-scroll{overflow:scroll !important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:none;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-vscrollbar,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-gutter-filler{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll;display:block !important;height:100%}.CodeMirror-vscrollbar::-webkit-scrollbar{-webkit-appearance:none;background-color:#f4f4f4;width:6px;height:6px}.CodeMirror-vscrollbar::-webkit-scrollbar-thumb{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background-color:#e2e2e2}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-hscrollbar::-webkit-scrollbar{-webkit-appearance:none;background-color:#f4f4f4;width:6px;height:6px}.CodeMirror-hscrollbar::-webkit-scrollbar-thumb{-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background-color:#e2e2e2}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:none !important;border:none !important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper::selection{background-color:transparent}.CodeMirror-gutter-wrapper::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;font-variant-ligatures:contextual}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;overflow:auto}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:none}.CodeMirror-scroll,.CodeMirror-sizer,.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber{-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-focused div.CodeMirror-cursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background:#ffa;background:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:\'\'}span.CodeMirror-selectedtext{background:none}'
				})
			);
		}
	}]);

	return ReactMarkedEditor;
}(_react.Component);

ReactMarkedEditor.propTypes = {
	initialMarkdown: _propTypes2.default.string,
	onChange: _propTypes2.default.func,
	markdownClassName: _propTypes2.default.string,
	markdownStyle: _propTypes2.default.object,
	editorHeight: _propTypes2.default.any,
	hideToolbar: _propTypes2.default.bool,
	toolbarCustomButtons: _propTypes2.default.array
};
ReactMarkedEditor.defaultProps = {
	editorHeight: 100,
	hideToolbar: false,
	toolbarCustomButtons: []
};

exports.default = ReactMarkedEditor;