import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar, WingBlank, WhiteSpace, Icon, Button, Flex } from 'antd-mobile';
import { SERVER_HOST } from '../../actions/server_info';

export default class GoodsList extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let { gid, thumb, title, description, score } = this.props;
		thumb = SERVER_HOST + thumb;
		//to={{pathname:"goods-detail/"+gid,query:{name:'abc'}}}
		return (
				<div className='goods_item'>
					
					<table>
						<tbody>
							<tr>
								<td className='goods_img_container'>
									<Link to={{pathname:"goods-detail/"+gid}}><img src={thumb} /></Link>
								</td>
								<td className='goods_info'>
									<div className='goods_title'>
										<Link to={{pathname:"goods-detail/"+gid}}>{title}</Link>
									</div>
									<div className='goods_ext'>
										<div className='goods_desc'>{description}</div>
										<div className='goods_score'>积分数：{score}</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					
				</div>
			);
	}
}