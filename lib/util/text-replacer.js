'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Replacer = function () {
	function Replacer(codeMirror) {
		_classCallCheck(this, Replacer);

		this.editor = codeMirror;
	}

	_createClass(Replacer, [{
		key: 'replace',
		value: function replace(actionType) {
			if (actionType == 'bold') {
				return this.bold();
			}
			if (actionType == 'remove') {
				return this.remove();
			}
			if (actionType == 'italic') {
				return this.italic();
			}
			if (actionType == 'code-inline') {
				return this.codeInline();
			}
			if (/^h[1-6]$/.test(actionType)) {
				return this.header(parseInt(actionType[1]));
			}
			if (actionType == 'quote') {
				return this.quote();
			}
			if (actionType == 'ul') {
				return this.ul();
			}
			if (actionType == 'ol') {
				return this.ol();
			}
			if (actionType == 'separate') {
				return this.separate();
			}
			if (actionType == 'link') {
				return this.link();
			}
			if (actionType == 'image') {
				return this.image();
			}
			if (actionType == 'code') {
				return this.code();
			}
			if (actionType == 'table') {
				return this.table();
			}
		}
	}, {
		key: 'bold',
		value: function bold() {
			var _this = this;

			var sels = this.editor.listSelections().map(function (selObj) {
				var fromPos = selObj.anchor;
				var toPos = selObj.head;
				if (_this.comparePos(selObj.anchor, selObj.head) > 0) {
					fromPos = selObj.head;
					toPos = selObj.anchor;
				}
				var content = _this.editor.getRange(fromPos, toPos, ' ');
				_this.editor.replaceRange('**' + content + '**', fromPos, toPos);
				var resultPos = {
					line: fromPos.line,
					ch: content.length > 0 ? fromPos.ch + content.length + 4 : fromPos.ch + 2
				};
				return {
					anchor: resultPos,
					head: resultPos
				};
			});
			this.editor.setSelections(sels);
			this.editor.focus();
		}
	}, {
		key: 'remove',
		value: function remove() {
			var _this2 = this;

			var sels = this.editor.listSelections().map(function (selObj) {
				var fromPos = selObj.anchor;
				var toPos = selObj.head;
				if (_this2.comparePos(selObj.anchor, selObj.head) > 0) {
					fromPos = selObj.head;
					toPos = selObj.anchor;
				}
				var content = _this2.editor.getRange(fromPos, toPos, ' ');
				_this2.editor.replaceRange('~~' + content + '~~', fromPos, toPos);
				var resultPos = {
					line: fromPos.line,
					ch: content.length > 0 ? fromPos.ch + content.length + 4 : fromPos.ch + 2
				};
				return {
					anchor: resultPos,
					head: resultPos
				};
			});
			this.editor.setSelections(sels);
			this.editor.focus();
		}
	}, {
		key: 'italic',
		value: function italic() {
			var _this3 = this;

			var sels = this.editor.listSelections().map(function (selObj) {
				var fromPos = selObj.anchor;
				var toPos = selObj.head;
				if (_this3.comparePos(selObj.anchor, selObj.head) > 0) {
					fromPos = selObj.head;
					toPos = selObj.anchor;
				}
				var content = _this3.editor.getRange(fromPos, toPos, ' ');
				_this3.editor.replaceRange('*' + content + '*', fromPos, toPos);
				var resultPos = {
					line: fromPos.line,
					ch: content.length > 0 ? fromPos.ch + content.length + 2 : fromPos.ch + 1
				};
				return {
					anchor: resultPos,
					head: resultPos
				};
			});
			this.editor.setSelections(sels);
			this.editor.focus();
		}
	}, {
		key: 'codeInline',
		value: function codeInline() {
			var _this4 = this;

			var sels = this.editor.listSelections().map(function (selObj) {
				var fromPos = selObj.anchor;
				var toPos = selObj.head;
				if (_this4.comparePos(selObj.anchor, selObj.head) > 0) {
					fromPos = selObj.head;
					toPos = selObj.anchor;
				}
				var content = _this4.editor.getRange(fromPos, toPos, ' ');
				_this4.editor.replaceRange('`' + content + '`', fromPos, toPos);
				var resultPos = {
					line: fromPos.line,
					ch: content.length > 0 ? fromPos.ch + content.length + 2 : fromPos.ch + 1
				};
				return {
					anchor: resultPos,
					head: resultPos
				};
			});
			this.editor.setSelections(sels);
			this.editor.focus();
		}
	}, {
		key: 'header',
		value: function header(n) {
			var s = '';
			while (n--) {
				s += '#';
			}
			s += ' ';
			this.insertStringAtLineFirst(s);
			this.editor.focus();
		}
	}, {
		key: 'quote',
		value: function quote() {
			this.insertStringAtLineFirst('> ');
			this.editor.focus();
		}
	}, {
		key: 'ul',
		value: function ul() {
			this.insertStringAtLineFirst('- ');
			this.editor.focus();
		}
	}, {
		key: 'ol',
		value: function ol() {
			this.insertStringAtLineFirst(function (idx) {
				return idx + '. ';
			});
			this.editor.focus();
		}
	}, {
		key: 'separate',
		value: function separate() {
			var _this5 = this;

			this.editor.listSelections().forEach(function (selObj) {
				var pos = selObj.head;
				if (_this5.editor.getLine(pos.line) == '') {
					_this5.editor.replaceRange('\n------------\n\n', pos, pos);
				} else {
					_this5.editor.replaceRange('\n\n------------\n\n', pos, pos);
				}
			});
			this.editor.focus();
		}
	}, {
		key: 'link',
		value: function link() {
			var _this6 = this;

			var sels = this.editor.listSelections().map(function (selObj) {
				var fromPos = selObj.anchor;
				var toPos = selObj.head;
				if (_this6.comparePos(selObj.anchor, selObj.head) > 0) {
					fromPos = selObj.head;
					toPos = selObj.anchor;
				}
				var content = _this6.editor.getRange(fromPos, toPos, ' ');
				_this6.editor.replaceRange('[' + content + ']()', fromPos, toPos);
				var resultPos = {
					line: fromPos.line,
					ch: fromPos.ch + content.length + 3
				};
				return {
					anchor: resultPos,
					head: resultPos
				};
			});
			this.editor.setSelections(sels);
			this.editor.focus();
		}
	}, {
		key: 'image',
		value: function image() {
			var _this7 = this;

			var sels = this.editor.listSelections().map(function (selObj) {
				var fromPos = selObj.anchor;
				var toPos = selObj.head;
				if (_this7.comparePos(selObj.anchor, selObj.head) > 0) {
					fromPos = selObj.head;
					toPos = selObj.anchor;
				}
				var content = _this7.editor.getRange(fromPos, toPos, ' ');
				_this7.editor.replaceRange('![' + content + ']()', fromPos, toPos);
				var resultPos = {
					line: fromPos.line,
					ch: fromPos.ch + content.length + 4
				};
				return {
					anchor: resultPos,
					head: resultPos
				};
			});
			this.editor.setSelections(sels);
			this.editor.focus();
		}
	}, {
		key: 'code',
		value: function code() {
			var _this8 = this;

			var sels = this.editor.listSelections().map(function (selObj) {
				var pos = selObj.anchor;
				if (_this8.comparePos(selObj.anchor, selObj.head) > 0) {
					pos = selObj.head;
				}
				if (_this8.editor.getLine(pos.line) == '') {
					_this8.editor.replaceRange('\n\`\`\`\n\`\`\`', pos, pos);
					var resultPos = {
						line: pos.line + 1,
						ch: 3
					};
					return {
						anchor: resultPos,
						head: resultPos
					};
				} else {
					_this8.editor.replaceRange('\n\n\`\`\`\n\`\`\`', pos, pos);
					var _resultPos = {
						line: pos.line + 2,
						ch: 3
					};
					return {
						anchor: _resultPos,
						head: _resultPos
					};
				}
			});
			this.editor.setSelections(sels);
			this.editor.focus();
		}
	}, {
		key: 'table',
		value: function table() {
			var _this9 = this;

			var table = '|   |   |\n|---|---|\n|   |   |';
			this.editor.listSelections().forEach(function (selObj) {
				var pos = selObj.head;
				if (_this9.editor.getLine(pos.line) == '') {
					_this9.editor.replaceRange('\n' + table, pos, pos);
				} else {
					_this9.editor.replaceRange('\n\n' + table, pos, pos);
				}
			});
			this.editor.focus();
		}
	}, {
		key: 'insertStringAtLineFirst',
		value: function insertStringAtLineFirst(s) {
			var _this10 = this;

			var selObjs = this.editor.listSelections();
			selObjs.forEach(function (obj) {
				var idx = 1;
				if (obj.anchor.line - obj.head.line > 0) {
					for (var i = obj.head.line; i <= obj.anchor.line; i++) {
						if (_this10.editor.getLine(i) == '') {
							continue;
						}
						var pos = {
							line: i,
							ch: 0
						};
						var str = typeof s == 'function' ? s(idx++) : s;
						_this10.editor.replaceRange(str, pos, pos);
					}
				} else {
					for (var _i = obj.anchor.line; _i <= obj.head.line; _i++) {
						if (_this10.editor.getLine(_i) == '') {
							continue;
						}
						var _pos = {
							line: _i,
							ch: 0
						};
						var _str = typeof s == 'function' ? s(idx++) : s;
						_this10.editor.replaceRange(_str, _pos, _pos);
					}
				}
			});
		}
	}, {
		key: 'comparePos',
		value: function comparePos(pos1, pos2) {
			if (pos1.line > pos2.line) {
				return 1;
			}
			if (pos1.line < pos2.line) {
				return -1;
			}
			if (pos1.ch > pos2.ch) {
				return 1;
			}
			if (pos1.ch < pos2.ch) {
				return -1;
			}
			return 0;
		}
	}, {
		key: 'destory',
		value: function destory() {
			this.editor = null;
		}
	}]);

	return Replacer;
}();

exports.default = Replacer;