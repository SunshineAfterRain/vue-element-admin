import request from '@/utils/request'

export function loginByUsername (query) {
    return request.post('/index/Login/doLogin/', query)
}