import React, { Component } from 'react';
import propTypes from 'prop-types';
import ActionButton from './action-button';
import ActionSeparator from './action-separator';

class ToolBar extends Component {
	render() {
		const iconSize = 30;
		const separatorHeight = 12;
		const separatorThickness = 1;
		const separatorPaddingHor = (this.props.height - separatorHeight) / 2;
		const styles = {
			toolbar: {
				lineHeight: (this.props.height - 1) + 'px'
			},
			btnWrapper: {
				padding: ((this.props.height - 1) - iconSize) / 2 + 'px'
			},
			separator: {
				padding: `${separatorPaddingHor}px 5px ${separatorPaddingHor}px 7px`
			}
		}
		let customButtons = this.props.customButtons || [];
		return (
			<div>
				<div className="toolbar" style={styles.toolbar}>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Bold"
							iconClass="fa-bold" onClick={this.props.onItemClick.bind(this, 'bold')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Strikethrough"
							iconClass="fa-strikethrough" onClick={this.props.onItemClick.bind(this, 'remove')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Italic"
							iconClass="fa-italic" onClick={this.props.onItemClick.bind(this, 'italic')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Inline code"
							iconClass="fa-code" onClick={this.props.onItemClick.bind(this, 'code-inline')}/>
					</div>
					<div className="btn-wrapper" style={styles.separator}>
						<ActionSeparator width={separatorThickness} height={separatorHeight}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="H1"
							text="H1" onClick={this.props.onItemClick.bind(this, 'h1')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="H2"
							text="H2" onClick={this.props.onItemClick.bind(this, 'h2')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="H3"
							text="H3" onClick={this.props.onItemClick.bind(this, 'h3')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="H4"
							text="H4" onClick={this.props.onItemClick.bind(this, 'h4')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="H5"
							text="H5" onClick={this.props.onItemClick.bind(this, 'h5')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="H6"
							text="H6" onClick={this.props.onItemClick.bind(this, 'h6')}/>
					</div>
					<div className="btn-wrapper" style={styles.separator}>
						<ActionSeparator width={separatorThickness} height={separatorHeight}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Quote"
							iconClass="fa-quote-left" onClick={this.props.onItemClick.bind(this, 'quote')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Unordered list"
							iconClass="fa-list-ul" onClick={this.props.onItemClick.bind(this, 'ul')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Ordered list"
							iconClass="fa-list-ol" onClick={this.props.onItemClick.bind(this, 'ol')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Separate"
							iconClass="fa-minus" onClick={this.props.onItemClick.bind(this, 'separate')}/>
					</div>
					<div className="btn-wrapper" style={styles.separator}>
						<ActionSeparator width={separatorThickness} height={separatorHeight}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Link"
							iconClass="fa-link" onClick={this.props.onItemClick.bind(this, 'link')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Image"
							iconClass="fa-picture-o" onClick={this.props.onItemClick.bind(this, 'image')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Code block"
							iconClass="fa-file-code-o" onClick={this.props.onItemClick.bind(this, 'code')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize} title="Table"
							iconClass="fa-table" onClick={this.props.onItemClick.bind(this, 'table')}/>
					</div>
					{customButtons.length > 0
						? <div className="btn-wrapper" style={styles.separator}>
							<ActionSeparator width={separatorThickness} height={separatorHeight} />
						</div>
						: null}
					{customButtons.map((btn, idx) => {
						return (
							<div className="btn-wrapper" style={styles.btnWrapper} key={idx + 1}>
								<ActionButton width={iconSize} height={iconSize}
									title={btn.title} text={btn.text}
									iconClass={btn.icon} onClick={btn._onClick} />
							</div>
						)
					})}
					<div className="btn-wrapper" style={styles.separator}>
						<ActionSeparator width={separatorThickness} height={separatorHeight}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize}
							title="Editor only" isSelect={this.props.showType == 'editor'}
							iconClass="fa-terminal" onClick={this.props.onItemClick.bind(this, 'state-editor')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize}
							title="Editor and preview" isSelect={this.props.showType == 'both'}
							iconClass="fa-columns" onClick={this.props.onItemClick.bind(this, 'state-both')}/>
					</div>
					<div className="btn-wrapper" style={styles.btnWrapper}>
						<ActionButton width={iconSize} height={iconSize}
							title="Preview only" isSelect={this.props.showType == 'view'}
							iconClass="fa-eye" onClick={this.props.onItemClick.bind(this, 'state-view')}/>
					</div>
				</div>
				<style jsx>{`
					.toolbar {
						box-sizing: border-box;
						border-bottom: 1px solid #eee;
						padding: 0px 10px;
					}
					.btn-wrapper {
						display: inline-block;
						vertical-align: middle;
					}
				`}</style>
			</div>
		);
	}
}
ToolBar.propTypes = {
	height: propTypes.number,
	onItemClick: propTypes.func,
	customButtons: propTypes.array,
	showType: propTypes.oneOf(['editor', 'both', 'view'])
};

export default ToolBar;