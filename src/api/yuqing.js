// 舆情分析模块的后台请求定义
import request from '@/utils/request'

// 设置爬虫的参数
export function setCrawlerParams (data) {
  const {s_key, s_date, s_time} = data
    return request({
      url: '/isp/yuqing/setCrawlerParams',
      method: 'post',
      params: {s_key, s_date, s_time}
      // params: { data, token }
    })
  }