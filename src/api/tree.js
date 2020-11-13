import request from '@/utils/request'
export function getBiaozhuTree (token) {
  return request({
    url: '/isp/tree/getBiaozhuTree',
    method: 'get',
    params: { token }
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
  const {anli, biaozhun} = data
  console.log("进入req");
  return request({
    url: '/isp/tree/addBiaozhuPair',
    method: 'get',
    params: { anli: anli, biaozhun: biaozhun }
  })
}
