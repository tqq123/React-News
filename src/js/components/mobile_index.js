import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Tabs, Carousel} from 'antd';
import MobileList from './mobile_list';
import MobileListPullRefresh from './mobile_list_pull_refresh';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidersToShow: 1,
			autoplay: true
		}
		return (
			<div>
				<MobileHeader></MobileHeader>
				<Tabs>
					<TabPane tab="头条" key="1">
						<div className="m_carousel">
							<Carousel {...settings}>
								<div><img src="./src/images/carousel_1.jpg"/></div>
								<div><img src="./src/images/carousel_2.jpg"/></div>
								<div><img src="./src/images/carousel_3.jpg"/></div>
								<div><img src="./src/images/carousel_4.jpg"/></div>
							</Carousel>
						</div>
						<MobileList count="20" type="top"></MobileList>
					</TabPane>
					<TabPane tab="社会" key="2">
						<MobileList count="20" type="shehui"></MobileList>
					</TabPane>
					<TabPane tab="国内" key="3">
						<MobileListPullRefresh count="20" type="guonei"></MobileListPullRefresh>
					</TabPane>
					<TabPane tab="国际" key="4">
						<MobileList count="20" type="guoji"></MobileList>
					</TabPane>
					<TabPane tab="娱乐" key="5">
						<MobileList count="20" type="yule"></MobileList>
					</TabPane>
				</Tabs>
				<MobileFooter></MobileFooter>
			</div>
		)
	}
}