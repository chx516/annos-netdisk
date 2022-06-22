<template>
	<div class="file-wrapper">
		<el-container class="el-container">
			<el-aside width="auto">
				<AdminMeun></AdminMeun>
			</el-aside>
			<el-container>
				<el-main class="el-main">
					<AdminList
          :tableType="tableType"></AdminList>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import AdminMeun from '_c/admin/AdminMeun.vue'
import AdminList from '_c/admin/AdminList.vue'

export default {
	name: 'Admin',
	components: {
		AdminMeun,
    AdminList
	},
  data(){
    return{
      tableType: {
				0: [
					{ label: '文件ID', prop: 'fileId',width:"100px"},
					{ label: '文件url', prop: 'fileUrl',width:"120px"},
					{ label: '文件大小', prop: 'fileSize',width:"120px"},
					{ label: '文件状态', prop: 'fileStatus',width:"120px"},
					{ label: 'md5标识号', prop: 'identifier',width:"120px"},
					{ label: '创建用户ID', prop: 'createUserId',width:"120px"},
					{ label: '创建时间', prop: 'modifyTime',width:"120px"},
					{ label: '修改时间', prop: 'modifyTime',width:"120px"},
					{ label: '修改用户ID', prop: 'modifyUserId',width:"120px"}
				],
       1:[
          { label: '用户文件ID', prop: 'userFileId',width:"100px"},
					{ label: '用户ID', prop: 'userId',width:"120px"},
					{ label: '系统文件ID', prop: 'fileId',width:"120px"},
					{ label: '文件名', prop: 'fileName',width:"120px"},
					{ label: '文件路径', prop: 'filePath',width:"120px"},
					{ label: '扩展名', prop: 'extendName',width:"120px"},
					{ label: '是否目录', prop: 'isDir',width:"120px"},
					{ label: '删除标识', prop: 'deleteFlag',width:"120px"},
					{ label: '删除时间', prop: 'deleteTime',width:"120px"}

       ],
       2:[
          { label: 'ID', prop: 'id',width:""},
					{ label: '文件类标识ID', prop: 'fileClassificationId',width:""},
					{ label: '文件类型ID', prop: 'fileTypeId',width:""},
					{ label: '文件扩展名', prop: 'fileExtendName',width:""},
					{ label: '文件类型名', prop: 'typeName',width:""},
       ],
       3:[
          { label: 'ID', prop: 'userid',width:"40px"},
					{ label: '用户名', prop: 'username',width:"100px"},
					{ label: '密码', prop: 'password',width:"100px"},
					{ label: '电子邮件', prop: 'email',width:"120px"},
					{ label: '已用空间/B', prop: 'storageSize',width:"120px"},
					{ label: '总空间/B', prop: 'totalStorageSize',width:"120px"},
					{ label: '注册时间', prop: 'registerTime',width:"120px"},
					{ label: '是否可用', prop: 'available',width:"120px"},
					// { label: '修改时间', prop: 'modifyTime',width:"120px"},
          // { label: '修改用户', prop: 'modifyUserId',width:"120px"},
          { label: '角色', prop: 'role',width:"50px"}

       ],
       
       4:[
          { label: 'ID', prop: 'id',width:"100px"},
					{ label: '路由线路', prop: 'router',width:""},
          { label: '路由状态值', prop: 'status',width:""},
       ],
       
       5:[
          { label: 'ID', prop: 'id',width:"40px"},
					{ label: 'IP', prop: 'ip',width:"100px"},
					{ label: '访问用户', prop: 'username',width:"100px"},
					{ label: '访问路径', prop: 'path',width:"120px"},
					{ label: '访问角色', prop: 'role',width:"120px"},
					{ label: 'UserAgent', prop: 'UserAgent',width:"120px"},
					{ label: '系统', prop: 'platform',width:"120px"},
					{ label: '访问时间', prop: 'createdTime',width:"120px"},
					{ label: '请求方法', prop: 'method',width:"120px"},
          { label: '请求参数', prop: 'params',width:"120px"},
       ],
			},
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl';
@import '~_a/styles/mixins.styl';

.file-wrapper {
  width: 100% !important;
}

.el-container {
  .el-aside {
    height: calc(100vh - 61px);
    overflow: hidden;
  }
}

.el-main {
  padding: 0px 16px !important;
  overflow: hidden;
}
</style>
