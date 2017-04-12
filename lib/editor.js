import React, { Component } from 'react';
import propTypes from 'prop-types';
import codeMirror from './codemirror-wrapper';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import ReactMarkedView from './react-marked';

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
		this.codeDoc = codeMirror.fromTextArea(this.refs.mdEditor, {
			mode: 'gfm',
			lineNumbers: true
		});
		this.codeDoc.setValue(this.state.markdown);
		this.codeDoc.on('change', this.onEditorValueChange);
		this.codeDoc.on('scroll', this.handleEditorScroll);
		this.refs.mdView.addEventListener('scroll', this.handleViewScroll);
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
				<div style={styles.wrapper}>
					<div style={styles.blockLeft}>
						<textarea ref="mdEditor" hidden></textarea>
					</div>
					<div style={styles.blockRight}>
						<div ref="mdView" style={styles.mdShow}>
							<ReactMarkedView markdown={this.state.markdown} style={markdownStyle} markdownClass={markdownClassName}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	wrapper: {
		boxSizing: 'border-box',
		height: '100%'
	},
	blockLeft: {
		boxSizing: 'border-box',
		borderRight: '5px solid #ddd',
		width: '50%',
		height: '100%',
		float: 'left'
	},
	blockRight: {
		boxSizing: 'border-box',
		paddingLeft: 10,
		width: '50%',
		height: '100%',
		float: 'left'
	},
	mdShow: {
		display: 'block',
		width: '100%',
		height: '100%',
		overflow: 'scroll'
	}
}

ReactMarkedEditor.propTypes = {
	initialMarkdown: propTypes.string,
	onChange: propTypes.func,
	markdownClassName: propTypes.string,
	markdownStyle: propTypes.object
};

export default ReactMarkedEditor;