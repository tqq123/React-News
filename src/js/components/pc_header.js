import React from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;	
const MenuItemGroup = Menu.ItemGroup;
import {Link} from 'react-router-dom';

class PCHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisiable: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		}
	}

	componentWillMount() {
		// 保存登录信息
		if (localStorage.userid) {
			this.setState({
				hasLogined: true,
				userNickName: localStorage.userNickName,
				userid: localStorage.userid
			})
		}
	}

	setModalVisiable(value) {
		this.setState({
			modalVisiable: value
		})
	}

	handleClick(e) {
		if (e.key === "register") {
			this.setState({
				current: 'register'
			})
			this.setModalVisiable(true);
		} else {
			this.setState({
				current: e.key
			})
		}
	}

	handleSubmit(e) {
	// 页面开始向API提交数据
		e.preventDefault();
		let myFetchOptions = {
			method: 'GET'
		}
		let formData = this.props.form.getFieldsValue();
		fetch("https://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({
				userNickName: json.NickUserName,
				userid: json.UserId
			})
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
		})
		if (this.state.action == "login") {
			this.setState({
				hasLogined: true
			})
		}
		if (this.state.action == "login") {
			message.success("登录成功!");
		} else {
			message.success("注册成功!");
		}
		
		this.setModalVisiable(false);
	}

	callback(key) {
		if (key == 1) {
			this.setState({
				action: 'login'
			})
		} else {
			this.setState({
				action: 'register'
			})
		}
	}

	logout() {
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({
			hasLogined: false
		})
	}

	render() {
		let {getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined
		? 
		<Menu.Item key="logout" className="register">
			<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
			&nbsp;&nbsp;
			<Link target="_blank" to="/usercenter">
				<Button type="dashed" htmlType="button">个人中心</Button>
			</Link>
			&nbsp;&nbsp;
			<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
		</Menu.Item>
		:
		<Menu.Item key="register" className="register">
			<Icon type="appstore"></Icon>注册/登录
		</Menu.Item>

		return (	
			<header>
				<Row>
					<Col span={1}></Col>
					<Col span={4}>
						<a href="/" className="logo">
							<img src="/src/images/logo.png" alt="logo" />
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={18}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="appstore"></Icon>头条
							</Menu.Item>
							<Menu.Item key="social">
								<Icon type="appstore"></Icon>社会
							</Menu.Item>
							<Menu.Item key="domestic">
								<Icon type="appstore"></Icon>国内
							</Menu.Item>
							<Menu.Item key="international">
								<Icon type="appstore"></Icon>国际
							</Menu.Item>
							<Menu.Item key="entertainment">
								<Icon type="appstore"></Icon>娱乐
							</Menu.Item>
							<Menu.Item key="sport">
								<Icon type="appstore"></Icon>体育
							</Menu.Item>
							<Menu.Item key="science">
								<Icon type="appstore"></Icon>科技
							</Menu.Item>
							<Menu.Item key="fashion">
								<Icon type="appstore"></Icon>时尚
							</Menu.Item>
							{userShow}
						</Menu>
						<Modal title="用户中心" wrapClassName="vertical-center-modal"
						 visible={this.state.modalVisiable}
						 onCancel = {() => this.setModalVisiable(false)}
						 onOk = {() => this.setModalVisiable(false) }
						 okText = "关闭"
						>
							<Tabs type="card" onChange={this.callback.bind(this)}>
								<TabPane tab="登录" key="1">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{getFieldDecorator('userName'),(<Input placeholder="请输入您的账号"/>)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('password'),(<Input type="password" placeholder="请输入您的密码"/>)}
										</FormItem>
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>
								<TabPane tab="注册" key="2">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{getFieldDecorator('r_userName'),(<Input placeholder="请输入您的账号"/>)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('r_password'),(<Input type="password" placeholder="请输入您的密码"/>)}
										</FormItem>
										<FormItem label="确认密码">
											{getFieldDecorator('r_confirmPassword'),(<Input type="password" placeholder="请再次输入您的密码"/>)}
										</FormItem>
										<Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
					</Col>
					<Col span={1}></Col>
				</Row>
			</header>
		)
	}
}

export default PCHeader = Form.create({})(PCHeader);
