import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/cloudnote/user/login.do',
    method: 'get',
    params: params
  })
}

//add by huangyl 注册
export function register(userInfo) {
  return request({
    url: '/cloudnote/user/regist.do',
    method: 'post',
    data: userInfo
  })
}
//add by huangyl 修改密码
export function updatePassword(data) {
  return request({
    url: '/cloudnote/user/updatePwd.do',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout(logOutInfo) {
  return request({
    url: '/cloudnote/user/logout.do',
    method: 'post',
    data:logOutInfo
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}
