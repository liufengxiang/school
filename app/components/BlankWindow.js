import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { WhiteSpace } from 'antd-mobile';

export default class BlankWindow extends Component {
	render() {
		return (
				<div>
					<div className='blank_window'> </div>
					{this.props.children}
				</div>
			);
	}
}
