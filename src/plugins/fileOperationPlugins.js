

/**
 * 动态引入操作文件的弹窗组件
 */
const fileOperateDialog = require.context(
	'_c/file/dialog',
	true,
	/\.\/(.*)\/index.js$/
)

const openDialog = fileOperateDialog
	.keys()
	.map((key) => {
		return { [key.split('/')[1]]: fileOperateDialog(key).default }
	})
	.reduce((pre, next) => {
		return { ...pre, ...next }
	}, {})

/**
 * 动态添加操作文件的遮罩或浮层组件
 */
const fileOperateBox = require.context(
	'_c/file/box',
	true,
	/\.\/(.*)\/index.js$/
)

const openBox = fileOperateBox
	.keys()
	.map((key) => {
		return { [key.split('/')[1]]: fileOperateBox(key).default }
	})
	.reduce((pre, next) => {
		return { ...pre, ...next }
	}, {})

export default { openDialog, openBox }
