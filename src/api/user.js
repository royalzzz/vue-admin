import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/isp/loginByUserName',
    method: 'get',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/isp/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/isp/logout',
    method: 'post'
  })
}
