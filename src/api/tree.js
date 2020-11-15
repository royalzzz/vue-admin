import request from '@/utils/request'
export function getBiaozhuTree () {
  return request({
    url: '/isp/tree/getBiaozhuTree',
    method: 'get',
  })
}
export function findByLabelLike (keyword) {
  return request({
    url: '/isp/tree/findByLabelLike',
    method: 'get',
    params: { keyword }
  })
}
export function addBiaozhuPair (data) {
  const { anli, biaozhun } = data
  console.log('进入req')
  return request({
    url: '/isp/tree/addBiaozhuPair',
    method: 'get',
    params: { anli: anli, biaozhun: biaozhun }
  })
}

export function getEventTft() {
  return request({
    url: '/isp/tree/getEventTft',
    method: 'get'
  })
}
export function getAccidentReport() {
  return request({
    url: '/isp/tree/getAccidentReport',
    method: 'get'
  })
}
