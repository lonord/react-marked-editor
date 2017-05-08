import React, { Component } from 'react';
import propTypes from 'prop-types';

class ActionButton extends Component {
	render() {
		const styles = {
			wrapper: {
				height: this.props.height,
				width: this.props.width
			},
			btn: {
				height: this.props.height - 2,
				width: this.props.width - 2,
				lineHeight: (this.props.width - 2) + 'px'
			}
		}
		return (
			<div style={styles.wrapper} className="wrapper" title={this.props.title}>
				<div className={this.props.isSelect ? 'btn btn-select' : 'btn'}
					style={styles.btn} onClick={this.props.onClick}>
					{this.props.text
						? <i className="fa text-btn">{this.props.text}</i>
						: <i className={'fa ' + this.props.iconClass}></i>}
				</div>	
				<style jsx>{`
					.wrapper {
						cursor: pointer;
					}
					.btn {
						border-radius: 3px;
						border: 1px solid transparent;
						text-align: center;
						color: #777;
					}
					.btn:hover {
						border: 1px solid #eee;
						background: #fafafa;
					}
					.btn-select {
						border: 1px solid #eee;
						background: #f0f0f0;
					}
					.text-btn {
						font-weight: bold;
					}
				`}</style>
			</div>
		);
	}
}
ActionButton.propTypes = {
	text: propTypes.string,
	iconClass: propTypes.string,
	width: propTypes.number,
	height: propTypes.number,
	onClick: propTypes.func,
	title: propTypes.string,
	isSelect: propTypes.bool
};
ActionButton.defaultProps = {
	iconClass: '',
	width: 24,
	height: 24,
	isSelect: false
}

export default ActionButton;