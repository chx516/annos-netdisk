<template>
	<div class="file-list-wrapper">
		<el-header height="auto">
			<div style="height: 70px; padding: 20px">
				<TableMeun
					ref="tablemeun"
					:fileType="fileType"
					:tableType="tableType"
					:searchOnClick="searchOnClick"
          :getTableDataByType="getTableDataByType"
				>
				</TableMeun>
			</div>
		</el-header>

		<AdminTable
			ref="admintable"
			:fileType="fileType"
			:fileList="fileList"
			:pageData="pageData"
			:tableType="tableType"
			:loading.sync="loading"
      :getTableDataByType="getTableDataByType"
		>
		</AdminTable>
		<div class="pagination-wrapper" v-if="this.fileType != 7">
			<div class="current-page-count">当前{{ fileList.length }}页条</div>
			<!-- 回收站不展示分页组件 -->
			<el-pagination
				prev-text="上一页"
				next-text="下一页"
				:page-size="pageData.pageCount"
				:total="pageData.total"
				:page-sizes="[5, 10, 20, 50]"
				:current-page="pageData.currentPage"
				:layout="'sizes, total, prev, pager, next'"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			>
			</el-pagination>
		</div>
	</div>
</template>


<script>
import TableMeun from './box/TableMeun.vue'
import AdminTable from './table/admin-table.vue'
import {
	getSysFilePage,
	getUserFilePage,
	getFileTypePage,
	getUserPage,
	getRouterPage,
	getLogsPage,
	AdminSearch,
} from '@/request/admin.js'
export default {
	name: 'AdminList',
	components: {
		AdminTable,
		TableMeun
	},
	props: {
		tableType: {
			require: true
		}
	},
	data() {
		return {
			fileList: [], //  表格数据-文件列表
			// 分页数据
			pageData: {
				pages: 1,
				currentPage: 1,
				pageCount: 10,
				total: 0
			},
			pages: 0,
			loading: false
			// search: this.$refs.tablemeun.search
		}
	},

	computed: {
		fileType() {
			return this.$route.query.fileType ? Number(this.$route.query.fileType) : 0
		},
		currentPage() {
			return this.pageData.currentPage
		},
		pageCount() {
			return this.pageData.pageCount
		}
	},
	created() {
		this.getTableDataByType()
	},
	watch: {
    /**
     * 监控文件类型变量，实现表格数据刷新
     */
		fileType() {
			// this.pageData.currentPage=this.pageDataInit.currentPage
			this.setPageCount()
			if (Number(this.fileType) == 0) this.showSysFileTableList()
			this.WatchFileType()
		},
		currentPage() {
			if (Number(this.fileType) == 0) this.showSysFileTableList()
			this.WatchFileType()
		},
		pageCount() {
			if (Number(this.fileType) == 0) this.showSysFileTableList()
			this.WatchFileType()
		}
	},
	methods: {
    /**
     * 表格搜索时的函数
     */
		searchOnClick() {
			let refs = this.$refs.tablemeun
			let text = refs.search.replace(/(^\s*)|(\s*$)/g, '')
			this.loading = true
			if (text.length > 0) {
				AdminSearch({
					searchType: this.fileType,
					searchKeyWord: refs.search
				}).then((res) => {
					this.fileList = res.data.list
					this.pageData.total = res.data.total
					this.pageData.pageCount = res.data.total
					this.loading = false
				})
			} else {
				this.setPageCount()
				if (Number(this.fileType) == 0) this.showSysFileTableList()
				this.WatchFileType()
				this.loading = false
			}
		},
    /**
     * 刷新表格数据
     */
		getTableDataByType() {
			if (this.fileType == 0) {
				this.showSysFileTableList()
			} else {
				this.WatchFileType()
			}
		},
    /**
     * 根据文件类型 fileType 加载表格数据
     */
		WatchFileType() {
			if (Number(this.fileType)) {
				switch (Number(this.fileType)) {
					case 1: {
						let data = {
							currentPage: this.pageData.currentPage,
							pageCount: this.pageData.pageCount
						}
						getUserFilePage(data).then((res) => {
							this.fileList = res.data.list
							this.pageData.total = res.data.total
						})
						break
					}
					case 2: {
						let data = {
							currentPage: this.pageData.currentPage,
							pageCount: this.pageData.pageCount
						}
						getFileTypePage(data).then((res) => {
							this.fileList = res.data.list
							this.pageData.total = res.data.total
						})
						break
					}
					case 3: {
						let data = {
							currentPage: this.pageData.currentPage,
							pageCount: this.pageData.pageCount
						}
						getUserPage(data).then((res) => {
							this.fileList = res.data.list
							this.pageData.total = res.data.total
						})
						break
					}
					case 4: {
						let data = {
							currentPage: this.pageData.currentPage,
							pageCount: this.pageData.pageCount
						}
						getRouterPage(data).then((res) => {
							this.fileList = res.data.list
							this.pageData.total = res.data.total
						})
						break
					}
					case 5: {
						let data = {
							currentPage: this.pageData.currentPage,
							pageCount: this.pageData.pageCount
						}
						getLogsPage(data).then((res) => {
							this.fileList = res.data.list
							this.pageData.total = res.data.total
						})
						break
					}
				}
			}
		},
    /**
     * 加载默认时的表格数据
     */
		showSysFileTableList() {
			// getSysFilePage()
			let data = {
				currentPage: this.pageData.currentPage,
				pageCount: this.pageData.pageCount
			}
      
			getSysFilePage(data)
				.then((res) => {
					this.fileList = res.data.list
					this.pageData.total = res.data.total
				})
				.catch((error) => {
					console.log(error)
				})
		},
		/**
		 * 表格数据获取相关事件 | 调整分页大小
		 */
		setPageCount() {
			this.pageData.currentPage = 1
			this.pageData.pageCount = 10
		},
		/**
		 * 表格数据获取相关事件 | 分页组件 | 页大小改变时
		 */
		handleSizeChange(pageCount) {
			this.pageData.pageCount = pageCount
		},
		/**
		 * 表格数据获取相关事件 | 分页组件 | 当前页码改变
		 */
		handleCurrentChange(currentPage) {
			this.pageData.currentPage = currentPage
		},
	}
}
</script>

<style lang="stylus" scoped>
.admin-list-wrapper {
  >>> .el-header {
    padding: 0;
  }

  .middle-wrapper {
    margin-bottom: 8px;
  }

  .pagination-wrapper {
    position: relative;
    border-top: 1px solid $BorderBase;
    height: 44px;
    line-height: 44px;
    text-align: center;

    .current-page-count {
      position: absolute;
      left: 16px;
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      color: $RegularText;
    }
  }
}

.pagination-wrapper {
  position: relative;
  border-top: 1px solid $BorderBase;
  height: 44px;
  line-height: 44px;
  text-align: center;

  .current-page-count {
    position: absolute;
    left: 16px;
    height: 32px;
    line-height: 32px;
    font-size: 13px;
    color: $RegularText;
  }
}
</style>