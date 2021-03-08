import request from '@/utils/request'

export function getBiaozhuTree() {
  return request({
    url: '/isp/tree/getBiaozhuTree',
    method: 'get'
  })
}

export function findByLabelLike(keyword) {
  return request({
    url: '/isp/tree/findByLabelLike',
    method: 'get',
    params: { keyword }
  })
}

export function addBiaozhuPair(data) {
  const { anli, biaozhun, source, sourceid } = data
  return request({
    url: '/isp/tree/addBiaozhuPair',
    method: 'get',
    params: { anli: anli, biaozhun: biaozhun, source: source, sourceid: sourceid }
  })
}

export function getEventTft() {
  return request({
    url: '/isp/tree/getEventTft',
    method: 'get'
  })
}

export function getEventTftPageable(data) {
  return request({
    url: '/isp/tree/getEventTftPageable',
    method: 'post',
    data: data
  })
}

export function getAccidentReport() {
  return request({
    url: '/isp/tree/getAccidentReport',
    method: 'get'
  })
}

export function getAccidentReportPageable(data) {
  console.log(data)
  return request({
    url: '/isp/tree/getAccidentReportPageable',
    method: 'post',
    data: data
  })
}

export function findBiaozhuPairBySourceid({ source, sourceid }) {
  return request({
    url: '/isp/tree/findBiaozhuPairBySourceid',
    method: 'get',
    params: { source, sourceid }
  })
}

export function deletePairById(id) {
  return request({
    url: '/isp/tree/deletePairById',
    method: 'get',
    params: { id }
  })
}

export function saveReport(data) {
  return request(({
    url: '/isp/tree/saveReport',
    method: 'post',
    data: data
  }))
}

export function removeReport(id) {
  return request({
    url: '/isp/tree/removeReport',
    method: 'get',
    params: { id }
  })
}
export function addEventNodeBiaozhuPair({ id, label, biaozhutext }) {
  return request({
    url: '/isp/tree/addEventNodeBiaozhuPair',
    method: 'get',
    params: { id, label, biaozhutext }
  })
}
export function findEventNodeBiaozhuPairbyNodeid(nodeid) {
  return request({
    url: '/isp/tree/findEventNodeBiaozhuPairbyNodeid',
    method: 'get',
    params: { nodeid }
  })
}
export function findAllEventNodeBiaozhuPair() {
  return request({
    url: '/isp/tree/findAllEventNodeBiaozhuPair',
    method: 'get'
  })
}
export function findAllEventNodeBiaozhuPairPageable(data) {
  return request({
    url: '/isp/tree/findAllEventNodeBiaozhuPairPageable',
    method: 'post',
    data: data
  })
}
export function deleteNodeBiaozhuPairById(id) {
  return request({
    url: '/isp/tree/deleteNodeBiaozhuPairById',
    method: 'get',
    params: { id }
  })
}
