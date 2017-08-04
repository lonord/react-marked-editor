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
					css: '.wrapper[data-jsx="2367950479"] {box-sizing: border-box;}.blockLeft[data-jsx="2367950479"] {box-sizing: border-box;width: 50%;height: 100%;float: left;}.blockRight[data-jsx="2367950479"] {box-sizing: border-box;width: 50%;height: 100%;float: left;}.blockFull[data-jsx="2367950479"] {width: 100% !important;}.blockHide[data-jsx="2367950479"] {display: none !important;}.mdShow[data-jsx="2367950479"] {display: block;overflow-y: scroll;overflow-x: hidden;}.mdShow[data-jsx="2367950479"]::-webkit-scrollbar {-webkit-appearance: none;background-color: #f4f4f4;width: 6px;height: 6px;}.mdShow[data-jsx="2367950479"]::-webkit-scrollbar-thumb {-webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;background-color: #e2e2e2;}.marked-view-wrapper[data-jsx="2367950479"] {padding: 10px 15px;}'
				}),
				_react2.default.createElement(_style2.default, {
					styleId: 1836844064,
					css: '\n\t\t\t\t/* BASICS */\n\n\t\t\t\t.CodeMirror {\n\t\t\t\t/* Set height, width, borders, and global font properties here */\n\t\t\t\tfont-family: monospace;\n\t\t\t\theight: 100%;\n\t\t\t\tcolor: black;\n\t\t\t\t}\n\n\t\t\t\t/* PADDING */\n\n\t\t\t\t.CodeMirror-lines {\n\t\t\t\tpadding: 4px 0; /* Vertical padding around content */\n\t\t\t\t}\n\t\t\t\t.CodeMirror pre {\n\t\t\t\tpadding: 0 4px; /* Horizontal padding of content */\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n\t\t\t\tbackground-color: white; /* The little square between H and V scrollbars */\n\t\t\t\t}\n\n\t\t\t\t/* GUTTER */\n\n\t\t\t\t.CodeMirror-gutters {\n\t\t\t\tborder-right: 1px solid #ddd;\n\t\t\t\tbackground-color: #f7f7f7;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-linenumbers {}\n\t\t\t\t.CodeMirror-linenumber {\n\t\t\t\tpadding: 0 3px 0 5px;\n\t\t\t\tmin-width: 20px;\n\t\t\t\ttext-align: right;\n\t\t\t\tcolor: #999;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-guttermarker { color: black; }\n\t\t\t\t.CodeMirror-guttermarker-subtle { color: #999; }\n\n\t\t\t\t/* CURSOR */\n\n\t\t\t\t.CodeMirror-cursor {\n\t\t\t\tborder-left: 1px solid black;\n\t\t\t\tborder-right: none;\n\t\t\t\twidth: 0;\n\t\t\t\t}\n\t\t\t\t/* Shown when moving in bi-directional text */\n\t\t\t\t.CodeMirror div.CodeMirror-secondarycursor {\n\t\t\t\tborder-left: 1px solid silver;\n\t\t\t\t}\n\t\t\t\t.cm-fat-cursor .CodeMirror-cursor {\n\t\t\t\twidth: auto;\n\t\t\t\tborder: 0 !important;\n\t\t\t\tbackground: #7e7;\n\t\t\t\t}\n\t\t\t\t.cm-fat-cursor div.CodeMirror-cursors {\n\t\t\t\tz-index: 1;\n\t\t\t\t}\n\n\t\t\t\t.cm-animate-fat-cursor {\n\t\t\t\twidth: auto;\n\t\t\t\tborder: 0;\n\t\t\t\t-webkit-animation: blink 1.06s steps(1) infinite;\n\t\t\t\t-moz-animation: blink 1.06s steps(1) infinite;\n\t\t\t\tanimation: blink 1.06s steps(1) infinite;\n\t\t\t\tbackground-color: #7e7;\n\t\t\t\t}\n\t\t\t\t@-moz-keyframes blink {\n\t\t\t\t0% {}\n\t\t\t\t50% { background-color: transparent; }\n\t\t\t\t100% {}\n\t\t\t\t}\n\t\t\t\t@-webkit-keyframes blink {\n\t\t\t\t0% {}\n\t\t\t\t50% { background-color: transparent; }\n\t\t\t\t100% {}\n\t\t\t\t}\n\t\t\t\t@keyframes blink {\n\t\t\t\t0% {}\n\t\t\t\t50% { background-color: transparent; }\n\t\t\t\t100% {}\n\t\t\t\t}\n\n\t\t\t\t/* Can style cursor different in overwrite (non-insert) mode */\n\t\t\t\t.CodeMirror-overwrite .CodeMirror-cursor {}\n\n\t\t\t\t.cm-tab { display: inline-block; text-decoration: inherit; }\n\n\t\t\t\t.CodeMirror-rulers {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0; right: 0; top: -50px; bottom: -20px;\n\t\t\t\toverflow: hidden;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-ruler {\n\t\t\t\tborder-left: 1px solid #ccc;\n\t\t\t\ttop: 0; bottom: 0;\n\t\t\t\tposition: absolute;\n\t\t\t\t}\n\n\t\t\t\t/* DEFAULT THEME */\n\n\t\t\t\t.cm-s-default .cm-header {color: blue;}\n\t\t\t\t.cm-s-default .cm-quote {color: #090;}\n\t\t\t\t.cm-negative {color: #d44;}\n\t\t\t\t.cm-positive {color: #292;}\n\t\t\t\t.cm-header, .cm-strong {font-weight: bold;}\n\t\t\t\t.cm-em {font-style: italic;}\n\t\t\t\t.cm-link {text-decoration: underline;}\n\t\t\t\t.cm-strikethrough {text-decoration: line-through;}\n\n\t\t\t\t.cm-s-default .cm-keyword {color: #708;}\n\t\t\t\t.cm-s-default .cm-atom {color: #219;}\n\t\t\t\t.cm-s-default .cm-number {color: #164;}\n\t\t\t\t.cm-s-default .cm-def {color: #00f;}\n\t\t\t\t.cm-s-default .cm-variable,\n\t\t\t\t.cm-s-default .cm-punctuation,\n\t\t\t\t.cm-s-default .cm-property,\n\t\t\t\t.cm-s-default .cm-operator {}\n\t\t\t\t.cm-s-default .cm-variable-2 {color: #05a;}\n\t\t\t\t.cm-s-default .cm-variable-3 {color: #085;}\n\t\t\t\t.cm-s-default .cm-comment {color: #a50;}\n\t\t\t\t.cm-s-default .cm-string {color: #a11;}\n\t\t\t\t.cm-s-default .cm-string-2 {color: #f50;}\n\t\t\t\t.cm-s-default .cm-meta {color: #555;}\n\t\t\t\t.cm-s-default .cm-qualifier {color: #555;}\n\t\t\t\t.cm-s-default .cm-builtin {color: #30a;}\n\t\t\t\t.cm-s-default .cm-bracket {color: #997;}\n\t\t\t\t.cm-s-default .cm-tag {color: #170;}\n\t\t\t\t.cm-s-default .cm-attribute {color: #00c;}\n\t\t\t\t.cm-s-default .cm-hr {color: #999;}\n\t\t\t\t.cm-s-default .cm-link {color: #00c;}\n\n\t\t\t\t.cm-s-default .cm-error {color: #f00;}\n\t\t\t\t.cm-invalidchar {color: #f00;}\n\n\t\t\t\t.CodeMirror-composing { border-bottom: 2px solid; }\n\n\t\t\t\t/* Default styles for common addons */\n\n\t\t\t\tdiv.CodeMirror span.CodeMirror-matchingbracket {color: #0f0;}\n\t\t\t\tdiv.CodeMirror span.CodeMirror-nonmatchingbracket {color: #f22;}\n\t\t\t\t.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }\n\t\t\t\t.CodeMirror-activeline-background {background: #e8f2ff;}\n\n\t\t\t\t/* STOP */\n\n\t\t\t\t/* The rest of this file contains styles related to the mechanics of\n\t\t\t\tthe editor. You probably shouldn\'t touch them. */\n\n\t\t\t\t.CodeMirror {\n\t\t\t\tposition: relative;\n\t\t\t\toverflow: hidden;\n\t\t\t\tbackground: white;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-scroll {\n\t\t\t\toverflow: scroll !important; /* Things will break if this is overridden */\n\t\t\t\t/* 30px is the magic margin used to hide the element\'s real scrollbars */\n\t\t\t\t/* See overflow: hidden in .CodeMirror */\n\t\t\t\tmargin-bottom: -30px; margin-right: -30px;\n\t\t\t\tpadding-bottom: 30px;\n\t\t\t\theight: 100%;\n\t\t\t\toutline: none; /* Prevent dragging from highlighting the element */\n\t\t\t\tposition: relative;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-sizer {\n\t\t\t\tposition: relative;\n\t\t\t\tborder-right: 30px solid transparent;\n\t\t\t\t}\n\n\t\t\t\t/* The fake, visible scrollbars. Used to force redraw during scrolling\n\t\t\t\tbefore actual scrolling happens, thus preventing shaking and\n\t\t\t\tflickering artifacts. */\n\t\t\t\t.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n\t\t\t\tposition: absolute;\n\t\t\t\tz-index: 6;\n\t\t\t\tdisplay: none;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-vscrollbar {\n\t\t\t\tright: 0; top: 0;\n\t\t\t\toverflow-x: hidden;\n\t\t\t\toverflow-y: scroll;\n\t\t\t\tdisplay: block !important;\n\t\t\t\theight: 100%;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-vscrollbar::-webkit-scrollbar {\n\t\t\t\t\t-webkit-appearance: none;\n\t\t\t\t\tbackground-color: #f4f4f4;\n\t\t\t\t\twidth: 6px;\n\t\t\t\t\theight: 6px;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-vscrollbar::-webkit-scrollbar-thumb {\n\t\t\t\t\t-webkit-border-radius: 0;\n\t\t\t\t\t-moz-border-radius: 0;\n\t\t\t\t\tborder-radius: 0;\n\t\t\t\t\tbackground-color: #e2e2e2;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-hscrollbar {\n\t\t\t\t\tbottom: 0; left: 0;\n\t\t\t\t\toverflow-y: hidden;\n\t\t\t\t\toverflow-x: scroll;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-hscrollbar::-webkit-scrollbar {\n\t\t\t\t\t-webkit-appearance: none;\n\t\t\t\t\tbackground-color: #f4f4f4;\n\t\t\t\t\twidth: 6px;\n\t\t\t\t\theight: 6px;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-hscrollbar::-webkit-scrollbar-thumb {\n\t\t\t\t\t-webkit-border-radius: 0;\n\t\t\t\t\t-moz-border-radius: 0;\n\t\t\t\t\tborder-radius: 0;\n\t\t\t\t\tbackground-color: #e2e2e2;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-scrollbar-filler {\n\t\t\t\tright: 0; bottom: 0;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-gutter-filler {\n\t\t\t\tleft: 0; bottom: 0;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-gutters {\n\t\t\t\tposition: absolute; left: 0; top: 0;\n\t\t\t\tmin-height: 100%;\n\t\t\t\tz-index: 3;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-gutter {\n\t\t\t\twhite-space: normal;\n\t\t\t\theight: 100%;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tvertical-align: top;\n\t\t\t\tmargin-bottom: -30px;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-gutter-wrapper {\n\t\t\t\tposition: absolute;\n\t\t\t\tz-index: 4;\n\t\t\t\tbackground: none !important;\n\t\t\t\tborder: none !important;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-gutter-background {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0; bottom: 0;\n\t\t\t\tz-index: 4;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-gutter-elt {\n\t\t\t\tposition: absolute;\n\t\t\t\tcursor: default;\n\t\t\t\tz-index: 4;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-gutter-wrapper ::selection { background-color: transparent }\n\t\t\t\t.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }\n\n\t\t\t\t.CodeMirror-lines {\n\t\t\t\tcursor: text;\n\t\t\t\tmin-height: 1px; /* prevents collapsing before first draw */\n\t\t\t\t}\n\t\t\t\t.CodeMirror pre {\n\t\t\t\t/* Reset some styles that the rest of the page might have set */\n\t\t\t\t-moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;\n\t\t\t\tborder-width: 0;\n\t\t\t\tbackground: transparent;\n\t\t\t\tfont-family: inherit;\n\t\t\t\tfont-size: inherit;\n\t\t\t\tmargin: 0;\n\t\t\t\twhite-space: pre;\n\t\t\t\tword-wrap: normal;\n\t\t\t\tline-height: inherit;\n\t\t\t\tcolor: inherit;\n\t\t\t\tz-index: 2;\n\t\t\t\tposition: relative;\n\t\t\t\toverflow: visible;\n\t\t\t\t-webkit-tap-highlight-color: transparent;\n\t\t\t\t-webkit-font-variant-ligatures: contextual;\n\t\t\t\tfont-variant-ligatures: contextual;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-wrap pre {\n\t\t\t\tword-wrap: break-word;\n\t\t\t\twhite-space: pre-wrap;\n\t\t\t\tword-break: normal;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-linebackground {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0; right: 0; top: 0; bottom: 0;\n\t\t\t\tz-index: 0;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-linewidget {\n\t\t\t\tposition: relative;\n\t\t\t\tz-index: 2;\n\t\t\t\toverflow: auto;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-widget {}\n\n\t\t\t\t.CodeMirror-rtl pre { direction: rtl; }\n\n\t\t\t\t.CodeMirror-code {\n\t\t\t\toutline: none;\n\t\t\t\t}\n\n\t\t\t\t/* Force content-box sizing for the elements where we expect it */\n\t\t\t\t.CodeMirror-scroll,\n\t\t\t\t.CodeMirror-sizer,\n\t\t\t\t.CodeMirror-gutter,\n\t\t\t\t.CodeMirror-gutters,\n\t\t\t\t.CodeMirror-linenumber {\n\t\t\t\t-moz-box-sizing: content-box;\n\t\t\t\tbox-sizing: content-box;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-measure {\n\t\t\t\tposition: absolute;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 0;\n\t\t\t\toverflow: hidden;\n\t\t\t\tvisibility: hidden;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-cursor {\n\t\t\t\tposition: absolute;\n\t\t\t\tpointer-events: none;\n\t\t\t\t}\n\t\t\t\t.CodeMirror-measure pre { position: static; }\n\n\t\t\t\tdiv.CodeMirror-cursors {\n\t\t\t\tvisibility: hidden;\n\t\t\t\tposition: relative;\n\t\t\t\tz-index: 3;\n\t\t\t\t}\n\t\t\t\tdiv.CodeMirror-dragcursors {\n\t\t\t\tvisibility: visible;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-focused div.CodeMirror-cursors {\n\t\t\t\tvisibility: visible;\n\t\t\t\t}\n\n\t\t\t\t.CodeMirror-selected { background: #d9d9d9; }\n\t\t\t\t.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }\n\t\t\t\t.CodeMirror-crosshair { cursor: crosshair; }\n\t\t\t\t.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }\n\t\t\t\t.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }\n\n\t\t\t\t.cm-searching {\n\t\t\t\tbackground: #ffa;\n\t\t\t\tbackground: rgba(255, 255, 0, .4);\n\t\t\t\t}\n\n\t\t\t\t/* Used to force a border model for a node */\n\t\t\t\t.cm-force-border { padding-right: .1px; }\n\n\t\t\t\t@media print {\n\t\t\t\t/* Hide the cursor when printing */\n\t\t\t\t.CodeMirror div.CodeMirror-cursors {\n\t\t\t\t\tvisibility: hidden;\n\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t/* See issue #2901 */\n\t\t\t\t.cm-tab-wrap-hack:after { content: \'\'; }\n\n\t\t\t\t/* Help users use markselection to safely style text background */\n\t\t\t\tspan.CodeMirror-selectedtext { background: none; }\n\t\t\t\t'
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