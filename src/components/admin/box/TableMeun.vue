<template>
	<div>
		<template>
			<el-input
				v-model="search"
				size="mini"
				style="width: 200px"
				placeholder="输入关键字搜索"
			/>
			<el-button
				icon="el-icon-search"
				size="mini"
				style="margin-left: 10px"
        @click="searchOnClick"
				>搜索</el-button
			>
		</template>

		<template>
			<el-button
				class="filter-item"
				style="margin-left: 10px"
				type="primary"
				icon="el-icon-edit"
				size="mini"
				@click="handleCreate"
				:disabled="
					[0, 1, 4, 5].indexOf(this.$props.fileType) >= 0 ? true : false
				"
			>
				添加
			</el-button>
			<el-button
				size="mini"
				style="margin-left: 10px"
				class="filter-item"
				type="primary"
				icon="el-icon-download"
			>
				导出表格
			</el-button>
		</template>
		<DialogAdd
			ref="gialogAdd"
			:fileType="fileType"
			:dialogVisible="dialogVisible"
			:handleClose="handleClose"
			:cancelEvent="cancelEvent"
			:defineEvent="defineEvent"
			:tableType="tableType"
		></DialogAdd>
	</div>
</template>

<script>
import DialogAdd from './DialogAdd.vue'
import { Message } from 'element-ui'
import { AddUserFile } from '@/request/admin.js'
export default {
	name: 'TableMeun',
	components: {
		DialogAdd
	},
	props: {
		fileType: {
			require: true
		},
		tableType: {
			require: true
		},
    searchOnClick:{
      require:true
    },
    getTableDataByType:{
      require:true
    }
	},
	data() {
		return {
			search: '',
			dialogVisible: false
		}
	},

	methods: {
    
		handleCreate() {
			this.dialogVisible = true
		},
		SearchExec() {},
		handleClose() {
			this.dialogVisible = false
		},
		cancelEvent() {
			this.dialogVisible = false
		},
		defineEvent() {
			let data = this.$refs.gialogAdd
			if (!this.vaildata(data.fromType)) {
				Message({
					message: '数据不得为空',
					type: 'warning'
				})
				return
			} else {
				if (this.$props.fileType == 2) {
					// console.log(data.fromType)
					AddUserFile(data.fromType).then((res) => {
						if (res.success) {
							Message({
								message: '添加成功',
								type: 'success'
							})
              this.dialogVisible=false
              this.$props.getTableDataByType()
						}else{
              Message.error("添加失败")
							
            }
					})
				}
			}
		},
		vaildata(data) {
			for (const key in data) {
				if (data[key] == '') {
					return false
				}
			}
			return true
		}
	}
}
</script>