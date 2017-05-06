import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkedEditor from '../../';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
		this.markdown = md;
	}
	
	handleMarkdownChange (newValue) {
		this.markdown = newValue;
	}

	render() {
		return (
			<div className="wrapper">
				<ReactMarkedEditor style={{height: '100%', width: '100%', border: '1px solid #777'}} initialMarkdown={md} onChange={this.handleMarkdownChange} />
				<style jsx>{`
					.wrapper {
						height: 100%;
						width: 100%;
						box-sizing: border-box;
						padding: 50px;
					}
				`}</style>
				<style jsx global>{`
				* {
					margin: 0px;
					padding: 0px;
				}
				html, body, #root {
					height: 100%;
					width: 100%;
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
