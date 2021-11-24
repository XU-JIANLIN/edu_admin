import request from '@/utils/request'

export function login(mobile, password) {
  return request({
    url: '/ucenter/member/admin/login',
    method: 'post',
    data: {
      mobile,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/ucenter/member/info',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/ucenter/member/logout',
    method: 'get'
  })
}
