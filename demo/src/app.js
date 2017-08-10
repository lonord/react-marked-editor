import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash.throttle';
import ReactMarkedEditor, { Replacer } from '../../src/';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
		this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 200);
		this.state = {
			winWidth: 1024,
			winHeight: 768
		}
		this.markdown = md;
	}
	
	handleMarkdownChange (newValue) {
		this.markdown = newValue;
	}

	componentDidMount() {
		this.setState({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight
		});
		window.addEventListener('resize', this.handleWindowResize);
	}

	componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
	}
	
	handleWindowResize() {
        this.setState({
            winWidth: window.innerWidth,
			winHeight: window.innerHeight
        });
    }

	/**
	 * @param codeMirror -> the codemirror doc instance
	 * @param clickEvent -> the click event
	 */
	handleImageUploadClick(codeMirror, clickEvent) {
		alert('You clicked the custom button! And an image will be added to editor.');
		const replacer = new Replacer(codeMirror)
		replacer.image('http://codemirror.net/doc/logo.png')
	}
		
	render() {
		const styles = {
			wrapper: {
				width: this.state.winWidth - 100,
				border: '1px solid #eee'
			}
		}
		//custom buttons defined here
		const btns = [
			{
				title: 'custom button',
				icon: 'upload',
				onClick: this.handleImageUploadClick.bind(this)
			}
		]
		return (
			<div className="wrapper">
				<ReactMarkedEditor style={styles.wrapper}
					editorHeight={this.state.winHeight - 140}	
					initialMarkdown={md}
					toolbarCustomButtons={btns}
					onChange={this.handleMarkdownChange} />
				<style jsx>{`
					.wrapper {
						margin: 50px 50px 0px 50px;
					}
				`}</style>
				<style jsx global>{`
				* {
					margin: 0px;
					padding: 0px;
				}
				`}</style>
			</div>
		);
	}
}

const md = `
# React marked editor example

1. item1
2. item3
3. item3

--------

- item1
- item2
- item3

A text of \`markdown\`.

\`\`\`js
console.log('this is javascript code');
\`\`\`

|this is table| A | B |
|-------------|---|---|
|    hello    | 1 | 2 |
|    world    | 3 | 4 |

#### EOF
`;
