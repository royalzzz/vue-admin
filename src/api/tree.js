import request from '@/utils/request'

export function getBiaozhuTree() {
  return request({
    url: '/isp/tree/getBiaozhuTree',
    method: 'get',
  })
}

export function findByLabelLike(keyword) {
  return request({
    url: '/isp/tree/findByLabelLike',
    method: 'get',
    params: {keyword}
  })
}

export function addBiaozhuPair(data) {
  const {anli, biaozhun, source, sourceid} = data
  console.log('进入req')
  return request({
    url: '/isp/tree/addBiaozhuPair',
    method: 'get',
    params: {anli: anli, biaozhun: biaozhun, source: source, sourceid: sourceid}
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

export function findBiaozhuPairBySourceid({source, sourceid}) {
  return request({
    url: '/isp/tree/findBiaozhuPairBySourceid',
    method: 'get',
    params: {source, sourceid}
  })
}

export function deletePairById(id) {
  return request({
    url: '/isp/tree/deletePairById',
    method: 'get',
    params: { id }
  })
}
