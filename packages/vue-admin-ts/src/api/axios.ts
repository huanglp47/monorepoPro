import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

class AxiosService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // 请求拦截逻辑
                return config;
            },
            (error: AxiosError) => {
                // 请求拦截错误处理
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                // 响应拦截逻辑
                return response.data;
            },
            (error: AxiosError) => {
                // 响应拦截错误处理
                return Promise.reject(error);
            }
        );
    }

    public get<T>(url: string, params?: any): Promise<T> {
        return this.axiosInstance.get<T>(url, { params })
    }

    public post<T>(url: string, data?: any): Promise<T> {
        return this.axiosInstance.post<T>(url, data)
    }


    // 添加其他 HTTP 方法的封装，如 put、delete 等

    // 可以根据需要自定义其他方法
    public setHeader(name: string, value: string): void {
        this.axiosInstance.defaults.headers.common[name] = value;
    }
}

export default AxiosService;
