import request from '@/utils/http/request'

export function apiRequest(data: any, apiUrl: string){
  return request({
    url: apiUrl,
    method: 'post',
    data: data
  })
}