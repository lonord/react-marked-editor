import React, { Component } from 'react';
import propTypes from 'prop-types';
import codeMirror from './codemirror-wrapper';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import ReactMarkedView from './marked-view';

class ReactMarkedEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markdown: props.initialMarkdown || ''
		}
		this.handleEditorTextChange = debounce(this.handleEditorTextChange.bind(this), 500);
		this.handleEditorScroll = throttle(this.handleEditorScroll.bind(this), 20);
		this.handleViewScroll = throttle(this.handleViewScroll.bind(this), 20);
		this.recEditorScroll = debounce(this.recEditorScroll.bind(this), 200);
		this.recViewScroll = debounce(this.recViewScroll.bind(this), 200);
		this.onEditorValueChange = this.onEditorValueChange.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.codeDoc = codeMirror.fromTextArea(this.refs.mdEditor, {
				mode: 'gfm',
				lineNumbers: true
			});
			this.codeDoc.on('change', this.onEditorValueChange);
			this.codeDoc.on('scroll', this.handleEditorScroll);
			this.refs.mdView.addEventListener('scroll', this.handleViewScroll);
			this.codeDoc.setValue(this.state.markdown);
		}, 1);
	}

	componentWillUnmount() {
		if (this.codeDoc) {
			this.codeDoc.off('change', this.onEditorValueChange);
			this.codeDoc.off('scroll', this.handleEditorScroll);
			this.codeDoc.setValue('');
			this.codeDoc = null;
		}
		this.refs.mdEditor.innerHTML = '';
		this.refs.mdView.removeEventListener('scroll', this.handleViewScroll);
	}

	onEditorValueChange () {
		this.props.onChange && this.props.onChange(this.codeDoc.getValue());
		this.handleEditorTextChange();
	}

	handleEditorTextChange () {
		this.setState({
			markdown: this.codeDoc.getValue()
		});
	}

	handleEditorScroll () {
		let { top, height, clientHeight } = this.codeDoc.getScrollInfo();
		if (height - clientHeight <= 0) {
			return;
		}
		let per = top / (height - clientHeight);
		this.refs.mdView.removeEventListener('scroll', this.handleViewScroll);
		this.refs.mdView.scrollTop = (this.refs.mdView.scrollHeight - this.refs.mdView.clientHeight) * per;
		this.recViewScroll();
	}

	handleViewScroll () {
		let top = this.refs.mdView.scrollTop;
		let height = this.refs.mdView.scrollHeight;
		let clientHeight = this.refs.mdView.clientHeight;
		if (height - clientHeight <= 0) {
			return;
		}
		let per = top / (height - clientHeight);
		this.codeDoc.off('scroll', this.handleEditorScroll);
		let scrollInfo = this.codeDoc.getScrollInfo();
		this.codeDoc.scrollTo(null, (scrollInfo.height - scrollInfo.clientHeight) * per);
		this.recEditorScroll();
	}

	recEditorScroll () {
		this.codeDoc.on('scroll', this.handleEditorScroll);
	}

	recViewScroll () {
		this.refs.mdView.addEventListener('scroll', this.handleViewScroll);
	}

	render() {
		let other = Object.assign({}, this.props);
		let { markdownClassName, markdownStyle } = this.props;
		delete other.markdownClassName;
		delete other.markdownStyle;
		delete other.initialMarkdown;
		return (
			<div {...other}>
				<div className="wrapper">
					<div className="blockLeft">
						<textarea ref="mdEditor" hidden></textarea>
					</div>
					<div className="blockRight">
						<div ref="mdView" className="mdShow">
							<ReactMarkedView markdown={this.state.markdown} style={markdownStyle} markdownClass={markdownClassName}/>
						</div>
					</div>
				</div>
				<style jsx>{`
					.wrapper {
						box-sizing: border-box;
						height: 100%;
					}
					.blockLeft {
						box-sizing: border-box;
						width: 50%;
						height: 100%;
						float: left;
					}
					.blockRight {
						box-sizing: border-box;
						padding-left: 10px;
						width: 50%;
						height: 100%;
						float: left;
					}
					.mdShow {
						display: block;
						width: 100%;
						height: 100%;
						overflow-y: scroll;
						overflow-x: hidden;
					}
					.mdShow::-webkit-scrollbar {
						-webkit-appearance: none;
						background-color: #f4f4f4;
						width: 6px;
						height: 6px;
					}
					.mdShow::-webkit-scrollbar-thumb {
						-webkit-border-radius: 0;
						-moz-border-radius: 0;
						border-radius: 0;
						background-color: #e2e2e2;
					}
				`}</style>
				<style jsx global>{`
				/* BASICS */

				.CodeMirror {
				/* Set height, width, borders, and global font properties here */
				font-family: monospace;
				height: 100%;
				color: black;
				}

				/* PADDING */

				.CodeMirror-lines {
				padding: 4px 0; /* Vertical padding around content */
				}
				.CodeMirror pre {
				padding: 0 4px; /* Horizontal padding of content */
				}

				.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
				background-color: white; /* The little square between H and V scrollbars */
				}

				/* GUTTER */

				.CodeMirror-gutters {
				border-right: 1px solid #ddd;
				background-color: #f7f7f7;
				white-space: nowrap;
				}
				.CodeMirror-linenumbers {}
				.CodeMirror-linenumber {
				padding: 0 3px 0 5px;
				min-width: 20px;
				text-align: right;
				color: #999;
				white-space: nowrap;
				}

				.CodeMirror-guttermarker { color: black; }
				.CodeMirror-guttermarker-subtle { color: #999; }

				/* CURSOR */

				.CodeMirror-cursor {
				border-left: 1px solid black;
				border-right: none;
				width: 0;
				}
				/* Shown when moving in bi-directional text */
				.CodeMirror div.CodeMirror-secondarycursor {
				border-left: 1px solid silver;
				}
				.cm-fat-cursor .CodeMirror-cursor {
				width: auto;
				border: 0 !important;
				background: #7e7;
				}
				.cm-fat-cursor div.CodeMirror-cursors {
				z-index: 1;
				}

				.cm-animate-fat-cursor {
				width: auto;
				border: 0;
				-webkit-animation: blink 1.06s steps(1) infinite;
				-moz-animation: blink 1.06s steps(1) infinite;
				animation: blink 1.06s steps(1) infinite;
				background-color: #7e7;
				}
				@-moz-keyframes blink {
				0% {}
				50% { background-color: transparent; }
				100% {}
				}
				@-webkit-keyframes blink {
				0% {}
				50% { background-color: transparent; }
				100% {}
				}
				@keyframes blink {
				0% {}
				50% { background-color: transparent; }
				100% {}
				}

				/* Can style cursor different in overwrite (non-insert) mode */
				.CodeMirror-overwrite .CodeMirror-cursor {}

				.cm-tab { display: inline-block; text-decoration: inherit; }

				.CodeMirror-rulers {
				position: absolute;
				left: 0; right: 0; top: -50px; bottom: -20px;
				overflow: hidden;
				}
				.CodeMirror-ruler {
				border-left: 1px solid #ccc;
				top: 0; bottom: 0;
				position: absolute;
				}

				/* DEFAULT THEME */

				.cm-s-default .cm-header {color: blue;}
				.cm-s-default .cm-quote {color: #090;}
				.cm-negative {color: #d44;}
				.cm-positive {color: #292;}
				.cm-header, .cm-strong {font-weight: bold;}
				.cm-em {font-style: italic;}
				.cm-link {text-decoration: underline;}
				.cm-strikethrough {text-decoration: line-through;}

				.cm-s-default .cm-keyword {color: #708;}
				.cm-s-default .cm-atom {color: #219;}
				.cm-s-default .cm-number {color: #164;}
				.cm-s-default .cm-def {color: #00f;}
				.cm-s-default .cm-variable,
				.cm-s-default .cm-punctuation,
				.cm-s-default .cm-property,
				.cm-s-default .cm-operator {}
				.cm-s-default .cm-variable-2 {color: #05a;}
				.cm-s-default .cm-variable-3 {color: #085;}
				.cm-s-default .cm-comment {color: #a50;}
				.cm-s-default .cm-string {color: #a11;}
				.cm-s-default .cm-string-2 {color: #f50;}
				.cm-s-default .cm-meta {color: #555;}
				.cm-s-default .cm-qualifier {color: #555;}
				.cm-s-default .cm-builtin {color: #30a;}
				.cm-s-default .cm-bracket {color: #997;}
				.cm-s-default .cm-tag {color: #170;}
				.cm-s-default .cm-attribute {color: #00c;}
				.cm-s-default .cm-hr {color: #999;}
				.cm-s-default .cm-link {color: #00c;}

				.cm-s-default .cm-error {color: #f00;}
				.cm-invalidchar {color: #f00;}

				.CodeMirror-composing { border-bottom: 2px solid; }

				/* Default styles for common addons */

				div.CodeMirror span.CodeMirror-matchingbracket {color: #0f0;}
				div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #f22;}
				.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }
				.CodeMirror-activeline-background {background: #e8f2ff;}

				/* STOP */

				/* The rest of this file contains styles related to the mechanics of
				the editor. You probably shouldn't touch them. */

				.CodeMirror {
				position: relative;
				overflow: hidden;
				background: white;
				}

				.CodeMirror-scroll {
				overflow: scroll !important; /* Things will break if this is overridden */
				/* 30px is the magic margin used to hide the element's real scrollbars */
				/* See overflow: hidden in .CodeMirror */
				margin-bottom: -30px; margin-right: -30px;
				padding-bottom: 30px;
				height: 100%;
				outline: none; /* Prevent dragging from highlighting the element */
				position: relative;
				}
				.CodeMirror-sizer {
				position: relative;
				border-right: 30px solid transparent;
				}

				/* The fake, visible scrollbars. Used to force redraw during scrolling
				before actual scrolling happens, thus preventing shaking and
				flickering artifacts. */
				.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
				position: absolute;
				z-index: 6;
				display: none;
				}
				.CodeMirror-vscrollbar {
				right: 0; top: 0;
				overflow-x: hidden;
				overflow-y: scroll;
				display: block !important;
				height: 100%;
				}
				.CodeMirror-vscrollbar::-webkit-scrollbar {
					-webkit-appearance: none;
					background-color: #f4f4f4;
					width: 6px;
					height: 6px;
				}
				.CodeMirror-vscrollbar::-webkit-scrollbar-thumb {
					-webkit-border-radius: 0;
					-moz-border-radius: 0;
					border-radius: 0;
					background-color: #e2e2e2;
				}
				.CodeMirror-hscrollbar {
					bottom: 0; left: 0;
					overflow-y: hidden;
					overflow-x: scroll;
				}
				.CodeMirror-hscrollbar::-webkit-scrollbar {
					-webkit-appearance: none;
					background-color: #f4f4f4;
					width: 6px;
					height: 6px;
				}
				.CodeMirror-hscrollbar::-webkit-scrollbar-thumb {
					-webkit-border-radius: 0;
					-moz-border-radius: 0;
					border-radius: 0;
					background-color: #e2e2e2;
				}
				.CodeMirror-scrollbar-filler {
				right: 0; bottom: 0;
				}
				.CodeMirror-gutter-filler {
				left: 0; bottom: 0;
				}

				.CodeMirror-gutters {
				position: absolute; left: 0; top: 0;
				min-height: 100%;
				z-index: 3;
				}
				.CodeMirror-gutter {
				white-space: normal;
				height: 100%;
				display: inline-block;
				vertical-align: top;
				margin-bottom: -30px;
				}
				.CodeMirror-gutter-wrapper {
				position: absolute;
				z-index: 4;
				background: none !important;
				border: none !important;
				}
				.CodeMirror-gutter-background {
				position: absolute;
				top: 0; bottom: 0;
				z-index: 4;
				}
				.CodeMirror-gutter-elt {
				position: absolute;
				cursor: default;
				z-index: 4;
				}
				.CodeMirror-gutter-wrapper ::selection { background-color: transparent }
				.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }

				.CodeMirror-lines {
				cursor: text;
				min-height: 1px; /* prevents collapsing before first draw */
				}
				.CodeMirror pre {
				/* Reset some styles that the rest of the page might have set */
				-moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;
				border-width: 0;
				background: transparent;
				font-family: inherit;
				font-size: inherit;
				margin: 0;
				white-space: pre;
				word-wrap: normal;
				line-height: inherit;
				color: inherit;
				z-index: 2;
				position: relative;
				overflow: visible;
				-webkit-tap-highlight-color: transparent;
				-webkit-font-variant-ligatures: contextual;
				font-variant-ligatures: contextual;
				}
				.CodeMirror-wrap pre {
				word-wrap: break-word;
				white-space: pre-wrap;
				word-break: normal;
				}

				.CodeMirror-linebackground {
				position: absolute;
				left: 0; right: 0; top: 0; bottom: 0;
				z-index: 0;
				}

				.CodeMirror-linewidget {
				position: relative;
				z-index: 2;
				overflow: auto;
				}

				.CodeMirror-widget {}

				.CodeMirror-rtl pre { direction: rtl; }

				.CodeMirror-code {
				outline: none;
				}

				/* Force content-box sizing for the elements where we expect it */
				.CodeMirror-scroll,
				.CodeMirror-sizer,
				.CodeMirror-gutter,
				.CodeMirror-gutters,
				.CodeMirror-linenumber {
				-moz-box-sizing: content-box;
				box-sizing: content-box;
				}

				.CodeMirror-measure {
				position: absolute;
				width: 100%;
				height: 0;
				overflow: hidden;
				visibility: hidden;
				}

				.CodeMirror-cursor {
				position: absolute;
				pointer-events: none;
				}
				.CodeMirror-measure pre { position: static; }

				div.CodeMirror-cursors {
				visibility: hidden;
				position: relative;
				z-index: 3;
				}
				div.CodeMirror-dragcursors {
				visibility: visible;
				}

				.CodeMirror-focused div.CodeMirror-cursors {
				visibility: visible;
				}

				.CodeMirror-selected { background: #d9d9d9; }
				.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }
				.CodeMirror-crosshair { cursor: crosshair; }
				.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }
				.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }

				.cm-searching {
				background: #ffa;
				background: rgba(255, 255, 0, .4);
				}

				/* Used to force a border model for a node */
				.cm-force-border { padding-right: .1px; }

				@media print {
				/* Hide the cursor when printing */
				.CodeMirror div.CodeMirror-cursors {
					visibility: hidden;
				}
				}

				/* See issue #2901 */
				.cm-tab-wrap-hack:after { content: ''; }

				/* Help users use markselection to safely style text background */
				span.CodeMirror-selectedtext { background: none; }
				`}</style>
			</div>
		);
	}
}

ReactMarkedEditor.propTypes = {
	initialMarkdown: propTypes.string,
	onChange: propTypes.func,
	markdownClassName: propTypes.string,
	markdownStyle: propTypes.object
};

export default ReactMarkedEditor;