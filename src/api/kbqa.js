import request from '@/utils/request'

export function findByPage (page) {
  return request({
    url: '/isp/kbqa/chemical/findByPage',
    method: 'post',
    data: page
  })
}
