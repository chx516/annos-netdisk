<template>
	<div class="login-register" id="registerBackground">
		<div class="contain">
			<div class="big-box" :class="{ active: isLogin }">
				<div class="big-contain" key="bigContainLogin" v-if="isLogin">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input
							type="username"
							placeholder="用户名"
							v-model="form.username"
						/>
						<input type="password" placeholder="密码" v-model="form.userpwd" />
					</div>
					<button class="bbutton" @click="login">登录</button>
				</div>
				<div
					class="big-contain"
					key="bigContainRegister"
					v-else-if="isRegister"
				>
					<div class="btitle">创建账户</div>
					<div class="bform">
						<input
							type="text"
							placeholder="用户名"
							v-model="form.username"
							v-on:keyup="onUserEnter"
						/>
						<span class="errTips" v-if="existed">* {{ usernameText }} *</span>
						<input
							type="email"
							placeholder="邮箱"
							v-model="form.useremail"
							v-on:keyup="onEmailEnter"
						/>
						<span class="errTips" v-if="emailError">* {{ emailText }} *</span>
						<input
							type="password"
							placeholder="密码"
							v-model="form.userpwd"
							v-on:keyup="onPasswdEnter"
						/>
						<span class="errTips" v-if="pawdError">* {{ passwordText }} *</span>
						<input
							type="password"
							placeholder="再次密码"
							v-model="form.reuserpwd"
							v-on:keyup="onRePasswdEnter"
						/>
						<span class="errTips" v-if="repawdError"
							>* {{ repasswordText }} *</span
						>
					</div>
					<button class="bbutton" style="width:120px" @click="register">注册并验证邮箱</button>
				</div>

				<div class="big-contain" key="bigContainReset" v-else>
					<div class="btitle">重置密码</div>
					<div class="bform">
						<input
							type="username"
							placeholder="用户名"
							v-model="form.username"
						/>
						<input type="email" placeholder="邮箱" v-model="form.useremail" />
					</div>
					<button class="bbutton" @click="toRepass">发送邮件</button>
				</div>
			</div>
			<div class="small-box" :class="{ active: isLogin }">
				<div class="small-contain" key="smallContainRegister" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">开始注册，和我们一起旅行</p>
					<button id="register" class="sbutton" @click="changeType">
						注册
					</button>
					<button
						id="reset"
						style="margin-top: 10px"
						class="sbutton"
						@click="changeType"
					>
						重置密码
					</button>
				</div>
				<div class="small-contain" key="smallContainLogin" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">与我们保持联系，请登录你的账户</p>
					<button id="login" class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
		<el-dialog
			v-if="dialogVisible"
			title="发送邮件验证码"
			:visible.sync="dialogVisible"
			width="30%"
		>
			<el-form :model="vform">
				<el-form-item label="发送邮件" :label-width="formLabelWidth">
					<el-input
						placeholder="请填写邮箱验证码"
						v-model="vform.num"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="VisibleEmailCode">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {
	getUserExist,
	getUserEmail,
	sendEmailcode,
	checkEmailcode,
	register,
	// login,
	repassR
} from '@/api/api_user'
// import {login2} from '@/store/user'
import { checkNumber, validateMail, checkPasswd } from '@/utils/validate'
import { Message } from 'element-ui'
import CanvasNest from 'canvas-nest.js'

// 配置
const config = {
	color: '230, 162, 60', // 线条颜色
	pointColor: '230, 162, 60', // 节点颜色
	opacity: 0.5, // 线条透明度
	count: 99, // 线条数量
	zIndex: -1 // 画面层级
}

export default {
	name: 'login-register',
	data() {
		return {
			dialogVisible: false,
			isLogin: true,
			isRegister: false,
			emailError: false,
			passwordError: false,
			existed: false,

			pawdError: false,
			repawdError: false,
			loading: false,
			formLabelWidth: '120px',
			usernameText: '用户名格式不正确',
			emailText: '电子邮件格式不正确',
			passwordText: '密码格式不正确',
			repasswordText: '两次密码不正确',
			form: {
				username: '',
				useremail: '',
				userpwd: '',
				reuserpwd: ''
			},
			vform: {
				num: ''
			},
			check_port: {
				check_user: false,
				check_pass: false,
				check_email: false,
				check_repass: false
			}
		}
	},
	watch: {
		created() {
			//  绘制背景图
			this.$nextTick(() => {
				let element = document.getElementById('registerBackground')
				new CanvasNest(element, config)
			})
		}
	},
	methods: {
		nitCheck() {
			const self = this
			self.check_port.check_user = false
			self.check_port.check_pass = false
			self.check_port.check_repass = false
			self.check_port.check_email = false
			self.form.username = ''
			self.form.useremail = ''
			self.form.userpwd = ''
			self.form.reuserpwd = ''
		},
		onUserEnter() {
			const self = this
			const name = this.form.username.toString()
			if (this.form.username.length > 0) {
				const resp = getUserExist(this.form.username)
				resp.then(function (result) {
					if (result.flash) {
						self.usernameText = '该用户已存在'
						self.existed = true
						self.check_port.check_user = false
						return
					} else {
						if (!checkNumber(name)) {
							self.usernameText = '用户名只能为数字'
							self.check_port.check_user = false
							self.existed = true
							return
						}
						self.existed = false
						self.check_port.check_user = true
					}
				})
			} else {
				self.existed = false
				self.check_port.check_user = false
			}
		},
		onPasswdEnter() {
			const self = this
			if (self.form.userpwd.length > 0) {
				const msg = checkPasswd(self.form.userpwd)

				if (msg != true) {
					self.passwordText = msg
					self.pawdError = true
					self.check_port.check_pass = false
					return
				}
				self.pawdError = false
				self.check_port.check_pass = true
				return
			} else {
				self.pawdError = false
				self.check_port.check_pass = false
				return
			}
		},
		onRePasswdEnter() {
			const self = this
			if (self.form.userpwd != self.form.reuserpwd) {
				self.repasswordText = '两次密码不正确'
				self.repawdError = true
				self.check_port.check_repass = false
				return
			}
			self.repawdError = false
			self.check_port.check_repass = true
			return
		},
		onEmailEnter() {
			const self = this
			if (self.form.useremail.length > 0) {
				if (!validateMail(self.form.useremail)) {
					self.emailText = '邮件格式不正确'
					self.emailError = true
					self.check_port.check_email = false
				} else {
					getUserEmail(self.form.useremail).then(function (result) {
						if (result.flash) {
							self.emailText = '该邮件已被使用'
							self.emailError = true
							self.check_port.check_email = false
							return
						}
						self.emailError = false
						self.check_port.check_email = true
						return
					})
				}
				return
			}
			self.emailError = false
		},
		changeType(e) {
			if (e.path[0].id == 'login') {
				this.isLogin = true
				this.isRegister = false
			} else if (e.path[0].id == 'register') {
				this.isLogin = false
				this.isRegister = true
			} else {
				this.isLogin = false
				this.isRegister = false
			}
			this.nitCheck()
		},
		login() {
			const self = this
      	if (!self.$store.getters.isLogin) {
			if (self.form.username == '' || self.form.password == '') {
				Message.error('账号或密码不能为空')
			} else {
				self.$store
					.dispatch('login2', {
						username: self.form.username,
						password: self.form.userpwd
					})
					.then(() => {
						if (self.$store.getters.isLogin) {
							Message({
								message: self.$store.getters.results.message,
								type: 'success'
							})
							this.nitCheck()
							if (!self.$store.getters.role) {
                this.$router.push({ name: 'File',query: { fileType: 0, filePath: '/' }})
							} else {
								 this.$router.push({ name: 'Admin',query: { fileType: 0}})
							}
						} else {
							Message.error(self.$store.getters.results.message)
						}
					})
			}
        }else{
          Message.error("您的账户已登录")
						
        }
		},

		register() {
			const self = this
			self.vform.num = ''

			if (
				self.check_port.check_user &&
				self.check_port.check_pass &&
				self.check_port.check_repass &&
				self.check_port.check_email
			) {
				if (self.form.useremail.length > 0) {
					const loading = this.$loading({
						lock: true,
						text: '正在发送邮件',
						// spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					sendEmailcode(self.form.useremail).then(function (result) {
						if (result.data) {
							Message({
								message: '验证码' + result.message,
								type: 'success'
							})

							loading.close()
							self.dialogVisible = true
							return
						}
						loading.close()
						Message.error(result.message)
						self.dialogVisible = false
						return
					})
				}
			} else {
				Message('信息不全或格式不正确')
			}
		},

		VisibleEmailCode() {
			const self = this

			if (self.vform.num.length > 0) {
				checkEmailcode({
					code: self.vform.num,
					email: self.form.useremail
				}).then(function (result) {
					if (result.data) {
						register({
							username: self.form.username,
							password: self.form.userpwd,
							email: self.form.useremail
						}).then((re) => {
							if (re.data) {
								Message({
									message: re.message,
									type: 'success'
								})
								self.nitCheck()
								setTimeout(function () {
									self.isRegister = false
									self.isLogin = true
								}, 1000)

								return
							} else {
								Message.error(re.message)
							}
						})

						self.dialogVisible = false
						return
					}
					Message.error(result.message)
					return
				})
			}
		},
		toRepass() {
			const self = this

			if (self.form.username.length > 0 && self.form.useremail.length > 0) {
				const loading = this.$loading({
					lock: true,
					text: '正在发送邮件',
					// spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				repassR({
					username: self.form.username,
					email: self.form.useremail
				}).then((result) => {
					if (result.data) {
						loading.close()
						Message({
							message: result.message,
							type: 'success'
						})
						this.nitCheck()
						return
					}
					setTimeout(function () {
						loading.close()
						Message.error(result.message)
					}, 500)
				})
			} else {
				Message.error('用户名或邮箱不能为空')
			}
		}
	}
}
</script>

<style scoped="scoped">
.login-register {
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
}
.contain {
	width: 60%;
	height: 60%;
	position: relative;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border-radius: 20px;
	box-shadow: 0 0 100px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
	width: 70%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 30%;
	transform: translateX(0%);
	transition: all 1s;
}
.big-contain {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.btitle {
	font-size: 1.5em;
	font-weight: bold;
	color: rgb(57, 167, 176);
}
.bform {
	width: 100%;
	height: 55%;
	padding: 2em 0;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.bform .errTips {
	display: block;
	width: 50%;
	text-align: left;
	color: red;
	font-size: 0.7em;
	margin-left: 1em;
}
.bform input {
	width: 50%;
	height: 30px;
	border: none;
	outline: none;
	border-radius: 10px;
	padding-left: 2em;
	background-color: #f0f0f0;
}
.bbutton {
	width: 20%;
	height: 40px;
	border-radius: 24px;
	border: none;
	outline: none;
	background-color: rgb(57, 167, 176);
	color: #fff;
	font-size: 0.9em;
	cursor: pointer;
}
.small-box {
	width: 30%;
	height: 100%;
	background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
	position: absolute;
	top: 0;
	left: 0;
	transform: translateX(0%);
	transition: all 1s;
	border-top-left-radius: inherit;
	border-bottom-left-radius: inherit;
}
.small-contain {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.stitle {
	font-size: 1.5em;
	font-weight: bold;
	color: #fff;
}
.scontent {
	font-size: 0.8em;
	color: #fff;
	text-align: center;
	padding: 2em 4em;
	line-height: 1.7em;
}
.sbutton {
	width: 60%;
	height: 40px;
	border-radius: 24px;
	border: 1px solid #fff;
	outline: none;
	background-color: transparent;
	color: #fff;
	font-size: 0.9em;
	cursor: pointer;
}

.big-box.active {
	left: 0;
	transition: all 0.5s;
}
.small-box.active {
	left: 100%;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: inherit;
	border-bottom-right-radius: inherit;
	transform: translateX(-100%);
	transition: all 1s;
}
.bbutton:hover {
	background-color: aquamarine;
}

.sbutton:hover {
	background-color: aquamarine;
}
</style>
