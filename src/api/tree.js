import request from '@/utils/request'
export function getBiaozhuTree (token) {
    return request({
      url: '/isp/tree/getBiaozhuTree',
      method: 'get',
      params: { token }
    })
  }