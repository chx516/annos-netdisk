<template>
	<div>
		<el-dialog
			:modal="true"
			:title="myFileMenuMap[this.$props.fileType] + '--添加数据'"
			:visible.sync="this.$props.dialogVisible"
			width="30%"
			:before-close="this.handleClose"
		>
			<el-form :model="fromType" label-width="150px" size="small">
				<el-form-item
					:label="item.label"
					:prop="item.prop"
					v-show="index != 0"
					v-for="(item, index) in this.$props.tableType[this.$props.fileType]"
					:key="index"
				>
					<el-input
						type="text"
						v-model="fromType[item.prop]"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancelEvent">取 消</el-button>
					<el-button type="primary" @click="defineEvent">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'DialogAdd',
	props: {
		fileType: {
			require: true
			// type: Array
		},
		tableType: {
			require: true
		},
		dialogVisible: {
			require: true,
			type: Boolean
		},
		handleClose: {
			require: true
		},
		cancelEvent: {
			require: true
		},
		defineEvent: {
			require: true
		}
	},
	data() {
		return {
			myFileMenuMap: {
				0: '系统文件',
				1: '用户文件',
				2: '文件类型',
				3: '用户管理',
				4: '路由管理',
				5: '日志管理',
				6: '商城管理',
				7: '系统管理'
			},
			fromType: {
        fileClassificationId:"",
        fileExtendName:"",
        fileTypeId:"",
        typeName:""
      }
		}
	}
}
</script>