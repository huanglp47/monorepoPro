import { request } from './axios'
const articleUrl = '/api/v1/search'

export const getHitsApiAction = ( params={}) => {
    return request('get', articleUrl, params)
}

export const getHupuApiAction = ( params={}) => {
    return request('get', '/pc/placement', params)
}
