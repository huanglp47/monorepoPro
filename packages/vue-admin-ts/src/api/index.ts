import AxiosService from './axios'
const articleUrl = '/api/v1/search?query=react'
const api = new AxiosService('https://api.example.com');
interface User {
    name: string;
    age: number;
}
export const getHitsApi = ( params={}) => {
    return api.get<User[]>(articleUrl)
        .then(users => {
            // 处理获取到的用户数据
        })
    .catch(error => {
        // 处理请求错误
    });
}
