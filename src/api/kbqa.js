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

export function findByTextLike (text) {
  return request({
    url: '/isp/kbqa/question/findByTextLike',
    method: 'post',
    params: {
      text: text
    }
  })
}

export function findAllQuestionTypes () {
  return request({
    url: '/isp/kbqa/question/findAllQuestionTypes',
    method: 'get'
  })
}

export function findAllQuestionIntents () {
  return request({
    url: '/isp/kbqa/question/findAllQuestionIntents',
    method: 'get'
  })
}

export function tagInformation () {
  return request({
    url: '/isp/kbqa/question/tagInformation',
    method: 'get'
  })
}

export function tagQuestion (tag) {
  return request({
    url: '/isp/kbqa/question/tagQuestion',
    method: 'post',
    data: tag
  })
}

export function tagBatchQuestion (tag) {
  return request({
    url: '/isp/kbqa/question/tagBatchQuestion',
    method: 'post',
    data: tag
  })
}

export function findQuestionTextByPage(page) {
  return request({
    url: '/isp/kbqa/question/findQuestionTextByPage',
    method: 'post',
    data: page
  })
}

export function analysis(text) {
  return request({
    url: '/isp/kbqa/stanford/example',
    method: 'post',
    params: { text: text }
  })
}
