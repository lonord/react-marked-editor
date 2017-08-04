'use strict';

var codeMirror;
try {
	codeMirror = require('codemirror');
	require('codemirror/mode/gfm/gfm');
} catch (e) {}

module.exports = codeMirror;