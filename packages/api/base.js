import axios from 'axios'
import {
    Modal,
} from 'ant-design-vue';


let Axios = axios.create({
    baseURI:'/',
    timeout: 10000,
})

// 除去input框 前后 空格
function trimSpace(s = "") {
    return String(s).replace(/(^\s*)|(\s*$)/g, "")
}

/**
 * 删除参数两端空白
 */
function trimSpaceFn(obj) {
    try {
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                if (typeof obj[k] == 'number' || typeof obj[k] == 'string') {
                    obj[k] = trimSpace(String(obj[k]))
                }
            }
        }
        return obj
    } catch (err) {
        return obj
    }
}

// Add a request interceptor
Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token') || ''

    // 登录--form表单提交；其他json提交
    if (config.method == 'post') {
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    // 格式化请求参数（去掉两端空白）
    config.data = trimSpaceFn(config.data)
    config.params = trimSpaceFn(config.params)

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.resp_code !== 0 && response.data.resp_code != '401') {
        Modal.error({
            content: response.data.resp_msg,
        });
    }
    if (response.data.resp_code == '401') {
        // 处理重新登录逻辑
        return response.data
    }

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 仅当不是前端主动请求时，才有错误提示
    if (error.response && error.response.status != undefined) {
        Modal.error({
            content: `请求失败，http状态码：${error.response.status}`,
        });
    } else {
        Modal.confirm({
            title: '提示',
            content: '网络超时，请稍后重试',
            onOk() {
                location.reload();
            },
        });
    }
    return Promise.reject(error);
});

export default Axios