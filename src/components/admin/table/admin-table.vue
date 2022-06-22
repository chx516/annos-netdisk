<template>
	<div>
		<el-table
			v-if="this.$props.fileType != 7"
			v-loading="loading"
			:fit="true"
			:border="true"
			size="medium"
			:highlight-current-row="true"
			:data="
				this.$props.fileList.slice(
					(this.$props.pageData.pages - 1) * this.$props.pageData.pageCount,
					this.$props.pageData.pageCount
				)
			"
			:max-height="this.windowHeight - 200"
			style="width: 100%"
		>
			<el-table-column
				:show-overflow-tooltip="true"
				:label="data.label"
				:prop="data.prop"
				:width="data.width"
				:resizable="true"
				v-for="(data, index) in tableType[this.$props.fileType]"
				:key="index"
			>
			</el-table-column>
			<el-table-column
				:label="this.$props.fileType != 4 ? '操作' : '当前状态'"
				align="center"
			>
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
						>编辑</el-button
					>
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<DialogEdit
			:tableEditBool="tableEditBool"
			:handleClose="handleClose"
			:cancelEvent="cancelEvent"
			:defineEvent="defineEvent"
			:fileType="fileType"
			:tableType="tableType"
			:dataEdit="dataEdit"
		>
		</DialogEdit>
	</div>
</template>

<script>
import DialogEdit from '../box/DialogEdit.vue'
import { AddFileType, delFileType } from '@/request/admin.js'
import { Message } from 'element-ui'
export default {
	name: 'AdminTable',
	components: {
		DialogEdit
	},
	props: {
		fileType: {
			required: true,
			type: Number
		},
		fileList: {
			require: true,
			type: Array
		},
		pageData: {
			require: true
		},
		tableType: {
			require: true
		},
		loading: {
			require: true,
			type: Boolean
		},
    getTableDataByType:{
      require:true
    }
	},
	data() {
		return {
			windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
			windowHeight: document.documentElement.clientHeight, //实时屏幕高度
			tableData: [],
			search: '',
			tableEditBool: false,
			dataEdit: {},
			index: ''
		}
	},

	methods: {
		handleEdit(index, row) {
			this.index = index
			this.dataEdit = row
			this.tableEditBool = true
		},
		handleDelete(index, row) {
			
			let data=row
			switch (this.$props.fileType) {
				case 2: {
					this.$confirm(`确定要删除该数据吗？`, {
						type: 'warning'
					}).then((r) => {
							if (r == 'confirm') {
								delFileType(data).then((res) => {
									if (res.success) {
                    this.index = index
										Message({
											message: res.message,
											type: 'success'
										})
                    this.$props.getTableDataByType()
									} else {
										Message.error(res.message)
									}
								})
							}
						}).catch((e) => {
							Message({
								message: e,
								type: 'success'
							})
						})
				}
			}
		},
		handleClose() {
			this.tableEditBool = false
		},
		cancelEvent() {
			this.tableEditBool = false
		},
		defineEvent() {
			if (this.$props.fileType == 2) {
				let data = this.dataEdit

				AddFileType(data).then((res) => {
					if (res.success) {
						Message({
							message: res.message,
							type: 'success'
						})
						this.tableEditBool = false
					} else {
						Message.error(res.message)
					}
				})
			}
		}
	}
}
</script>

<style lang="stylus" scoped></style>