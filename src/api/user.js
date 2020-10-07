import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/isp/loginByUserName',
    method: 'post',
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
    url: '/isp/user/logout',
    method: 'post'
  })
}
