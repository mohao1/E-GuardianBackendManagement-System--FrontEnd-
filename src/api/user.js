import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Login/ManagementLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/Management/GetManagementData',
    method: 'Get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
