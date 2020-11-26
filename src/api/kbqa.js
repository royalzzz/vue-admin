import request from '@/utils/request'

export function findByPage (page) {
  return request({
    url: '/isp/kbqa/chemical/findByPage',
    method: 'post',
    data: page
  })
}

export function findByKeyAndValue (key, value) {
  return request({
    url: '/isp/kbqa/es_demo/search',
    method: 'post',
    params: {
      key: key,
      value: value
    }
  })
}
