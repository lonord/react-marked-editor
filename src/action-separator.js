import React, { Component } from 'react';
import propTypes from 'prop-types';

class ActionSeparator extends Component {
	render() {
		const styles = {
			wrapper: {
				height: this.props.height,
				width: this.props.width
			},
			sep: {
				height: this.props.height,
				width: this.props.thickness
			}
		}
		return (
			<div style={styles.wrapper} className="wrapper">
				<div style={styles.sep} className="sep"></div>
				<style jsx>{`
					.wrapper {
						display: table;
					}
					.sep {
						background: #eee;
						vertical-align: middle;
						display: table-cell;
					}
				`}</style>
			</div>
		);
	}
}
ActionSeparator.propTypes = {
	thickness: propTypes.number,
	width: propTypes.number,
	height: propTypes.number
};
ActionSeparator.defaultProps = {
	thickness: 1,
	width: 24,
	height: 24
}

export default ActionSeparator;