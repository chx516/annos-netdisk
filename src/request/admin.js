// 文件模块相关接口
import { post } from './http'


export const getSysFilePage = (p) => post('/admin/sysfilePage.do', p)

export const getUserFilePage = (p) => post('/admin/userfilePage.do', p)

export const getFileTypePage = (p) => post('/admin/fileTypePage.do', p)

export const getUserPage = (p) => post('/admin/userPage.do', p)

export const getRouterPage = (p) => post('/admin/routerPage.do', p)

export const getLogsPage = (p) => post('/admin/logsPage.do', p)

export const AddUserFile = (p) => post("/admin/addfileType.do", p)

export const AdminSearch = (p) => post("/admin/search", p)

export const AddFileType = (p) => post("/admin/addFileType.do", p)

export const delFileType = (p) => post("/admin/delFileType.do", p)
