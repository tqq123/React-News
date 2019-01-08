import React from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;	
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends React.Component {
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

	login() {
		this.setModalVisiable(true);
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

	logout(e) {
		e.preventDefault();
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({
			hasLogined: false
		})
	}

	render() {
		let {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined ?
		<Link to="/usercenter">
			<span className="exit" onClick={this.logout.bind(this)}>退出</span>
			<Icon type="inbox"/>
		</Link>
		:
		<Icon type="setting" onClick={this.login.bind(this)} />


		return (
			<div id="mobileheader">
				<header>
					<img src="./src/images/logo.png" alt="logo" />
					<span>ReactNews</span>
					{userShow}
				</header>
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
									<Input placeholder="请输入您的账号" {...getFieldProps('userName')} />
								</FormItem>
								<FormItem label="密码">
									<Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')} />
								</FormItem>
								<Button type="primary" htmlType="submit">登录</Button>
							</Form>
						</TabPane>
						<TabPane tab="注册" key="2">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									<Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />
								</FormItem>
								<FormItem label="密码">
									<Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')} />
								</FormItem>
								<FormItem label="确认密码">
									<Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')} />
								</FormItem>
								<Button type="primary" htmlType="submit">注册</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</div>
		)
	}
}

export default MobileHeader = Form.create({})(MobileHeader);