<template>
	<div>
		<el-dialog
			title="重置密码"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-form :model="formr" label-position="left" label-width="80px" size="small">
				<el-form-item label-position="left" label="重置密码" prop="password">
					<el-input type="password" v-model="formr.password" placeholder="请输入新密码" />
				</el-form-item>
        <el-form-item label="再次密码" prop="repassword">
					<el-input type="password" v-model="formr.repassword" placeholder="再次输入密码"/>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogClose">取 消</el-button>
				<el-button type="primary" @click="dialogSure">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { toCheckToken,doRepass } from '@/request/user.js'
import { Message } from 'element-ui'
export default {
	name: 'Repass',
	computed: {
		retoken() {
			return this.$route.params.retoken
		}
	},
	data() {
		return {
			dialogVisible: false,
			formr: {
				password: '',
				repassword: ''
			}
		}
	},
	created() {
		toCheckToken({ retoken: this.retoken }).then((res) => {
			if (res.success) {
				this.dialogVisible = true
			} else {
				Message.error(res)
				this.$router.push({ name: 'Home' })
			}
		})
	},
	methods: {
		handleClose() {
			this.dialogVisible = false
		},
		dialogClose() {
			this.dialogVisible = false
		},
		dialogSure() {
      if(this.formr.password.length>=6){
        if(this.formr.password==this.formr.repassword){
          doRepass({
            retoken:this.retoken,
            password:this.formr.password
          }).then(res => {
            if(res.success){
              	Message({
								message: res.message,
								type: 'success'
							})
              this.dialogVisible = false
              this.$router.push({ name: 'Home' })
            }else{
              Message.error(res.message)
            }
          })
        }else{
          
          Message.error("两次密码输入不一致")
        }
      }else{
        Message.error("密码应不少于6位")
      }
    }
	}
}
</script>




