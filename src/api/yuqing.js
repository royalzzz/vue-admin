// 舆情分析模块的后台请求定义
import request from '@/utils/request'

// 设置爬虫的参数
export function setCrawlerParams(data) {
  const { s_key, s_date, s_time } = data
  return request({
    url: '/isp/yuqing/setCrawlerParams',
    method: 'post',
    params: { s_key, s_date, s_time }
    // params: { data, token }
  })
}

export function getAllYuqingOriginnewsPageable(data) {
  return request({
    url: '/isp/yuqing/getAllYuqingOriginnewsPageable',
    method: 'post',
    data: data
  })
}
export function getYuqingOriginnewsWithClaPageable(data) {
  return request({
    url: '/isp/yuqing/getYuqingOriginnewsWithClaPageable',
    method: 'post',
    data: data
  })
}

export function getYuqingOriginnewsWithoutClaPageable(data) {
  return request({
    url: '/isp/yuqing/getYuqingOriginnewsWithoutClaPageable',
    method: 'post',
    data: data
  })
}
export function updateNewsData(data) {
  return request({
    url: '/isp/yuqing/updateOriginNewsData',
    method: 'post',
    data: data
  })
}
export function chargeClass() {
  return request({
    url: '/isp/yuqing/chargeClass',
    method: 'get'
  })
}
export function getAllYuqingCommentsNumPageable(data) {
  return request({
    url: 'isp/yuqingCalu/getAllYuqingCommentsNumPageable',
    method: 'post',
    data: data
  })
}
