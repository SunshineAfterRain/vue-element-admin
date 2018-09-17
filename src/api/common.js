import request from '@/utils/request'

export function fetchMenuList (query) {
    return request.get('/index/Index/getMenu/', query)
}