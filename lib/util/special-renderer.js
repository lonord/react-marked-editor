'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.startswith');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.endswith');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpecialRenderer = function () {
	function SpecialRenderer() {
		_classCallCheck(this, SpecialRenderer);
	}

	_createClass(SpecialRenderer, null, [{
		key: 'originEmRenderer',
		value: function originEmRenderer(str) {
			return '<em>' + str + '</em>';
		}
	}, {
		key: 'originImageRenderer',
		value: function originImageRenderer(href, title, text) {
			return '<img src="' + (href || '') + '" alt="' + (text || '') + '" title="' + (title || '') + '">';
		}
	}, {
		key: 'em',
		value: function em(str) {
			if (str.length < 3) {
				return SpecialRenderer.originEmRenderer(str);
			}
			var startChar = str[0];
			var endChar = str[str.length - 1];
			if (startChar === '@' && endChar === '@') {
				return '<span class="red">' + str.substring(1, str.length - 1) + '</span>';
			}
			if (startChar === '#' && endChar === '#') {
				return '<span class="yellow">' + str.substring(1, str.length - 1) + '</span>';
			}
			if (startChar === '$' && endChar === '$') {
				return '<span class="blue">' + str.substring(1, str.length - 1) + '</span>';
			}
			if (str.length > 3) {
				if ((0, _lodash2.default)(str, '\\@') && (0, _lodash4.default)(str, '\\@')) {
					return SpecialRenderer.originEmRenderer('@' + str.substring(2, str.length - 2) + '@');
				}
				if ((0, _lodash2.default)(str, '\\#') && (0, _lodash4.default)(str, '\\#')) {
					return SpecialRenderer.originEmRenderer('#' + str.substring(2, str.length - 2) + '#');
				}
				if ((0, _lodash2.default)(str, '\\$') && (0, _lodash4.default)(str, '\\$')) {
					return SpecialRenderer.originEmRenderer('$' + str.substring(2, str.length - 2) + '$');
				}
			}
			return SpecialRenderer.originEmRenderer(str);
		}
	}, {
		key: 'image',
		value: function image(href, title, text) {
			var reg = /@[0-9]+$/;
			var reg2 = /@[0-9]+c$/;
			if (text && reg.test(text)) {
				var size = reg.exec(text)[0].substring(1);
				return '<img src="' + (href || '') + '" \n\t\t\talt="' + text.replace(reg, '') + '" \n\t\t\ttitle="' + (title || '') + '" \n\t\t\tstyle="max-width: ' + size + 'px;max-height: ' + size + 'px;">';
			}
			if (text && reg2.test(text)) {
				var ss = reg2.exec(text)[0];
				var _size = ss.substring(1, ss.length - 1);
				return '<div style="text-align:center;"><img src="' + (href || '') + '" \n\t\t\talt="' + text.replace(reg2, '') + '" \n\t\t\ttitle="' + (title || '') + '" \n\t\t\tstyle="max-width: ' + _size + 'px;max-height: ' + _size + 'px;"></div>';
			}
			return SpecialRenderer.originImageRenderer(href, title, text);
		}
	}]);

	return SpecialRenderer;
}();

exports.default = SpecialRenderer;