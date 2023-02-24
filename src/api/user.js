import request from '@/utils/request'

export function refreshToken() {
  return request({
    url: '/admin/refresh-token',
    method: 'get'
  })
}
