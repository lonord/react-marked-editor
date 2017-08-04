'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.throttle');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollHelper = function () {
	function ScrollHelper(codeMirror, dom) {
		_classCallCheck(this, ScrollHelper);

		this.editor = codeMirror;
		this.view = dom;
		this.handleEditorScroll = (0, _lodash4.default)(this.handleEditorScroll.bind(this), 20);
		this.handleViewScroll = (0, _lodash4.default)(this.handleViewScroll.bind(this), 20);
		this.recEditorScroll = (0, _lodash2.default)(this.recEditorScroll.bind(this), 200);
		this.recViewScroll = (0, _lodash2.default)(this.recViewScroll.bind(this), 200);
		this.init();
	}

	_createClass(ScrollHelper, [{
		key: 'init',
		value: function init() {
			this.editor.on('scroll', this.handleEditorScroll);
			this.view.addEventListener('scroll', this.handleViewScroll);
		}
	}, {
		key: 'handleEditorScroll',
		value: function handleEditorScroll() {
			var _editor$getScrollInfo = this.editor.getScrollInfo(),
			    top = _editor$getScrollInfo.top,
			    height = _editor$getScrollInfo.height,
			    clientHeight = _editor$getScrollInfo.clientHeight;

			if (height - clientHeight <= 0) {
				return;
			}
			var per = top / (height - clientHeight);
			this.view.removeEventListener('scroll', this.handleViewScroll);
			this.view.scrollTop = (this.view.scrollHeight - this.view.clientHeight) * per;
			this.recViewScroll();
		}
	}, {
		key: 'handleViewScroll',
		value: function handleViewScroll() {
			var top = this.view.scrollTop;
			var height = this.view.scrollHeight;
			var clientHeight = this.view.clientHeight;
			if (height - clientHeight <= 0) {
				return;
			}
			var per = top / (height - clientHeight);
			this.editor.off('scroll', this.handleEditorScroll);
			var scrollInfo = this.editor.getScrollInfo();
			this.editor.scrollTo(null, (scrollInfo.height - scrollInfo.clientHeight) * per);
			this.recEditorScroll();
		}
	}, {
		key: 'recEditorScroll',
		value: function recEditorScroll() {
			this.editor.on('scroll', this.handleEditorScroll);
		}
	}, {
		key: 'recViewScroll',
		value: function recViewScroll() {
			this.view.addEventListener('scroll', this.handleViewScroll);
		}
	}, {
		key: 'destory',
		value: function destory() {
			this.view && this.view.removeEventListener('scroll', this.handleViewScroll);
			this.editor && this.editor.off('scroll', this.handleEditorScroll);
			this.view = null;
			this.editor = null;
		}
	}]);

	return ScrollHelper;
}();

exports.default = ScrollHelper;