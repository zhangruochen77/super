// 引入 axios
import axios from 'axios'
// 单独引入element-ui使用
import {Message} from 'element-ui'

const service = axios.create({
    // baseURL: 'http://106.55.105.100:9999',
    baseURL: 'http://localhost:8888',
    timeout: 15000 // 请求超时时间
})

// 设置响应接口
service.interceptors.response.use(success => {  // 访问到了后端的接口，需要判断是否逻辑正确

    if (success.status && success.status === 200) {
        return success
    }

    return success  // 正常接收到结构 需要将对象返回
}, error => {   // 直接错误响应，直接服务器都不让进行访问

    console.log(error.url)
    if (error.response.code === 403) {
        // 没有登录
        console.log('未登录')
        Message.error('未登录')
    }

    if (error.response.code === 500) {
        // 对应提示服务器错误
        console.log('服务器错误:' + error)
        Message.error('服务器开小差了')
    }
    // ...

    return
})

service.interceptors.request.use(success => {
    // 表明这是后台项目 其作用在于判别前后台的不同操作
    success.headers['plat'] = 'END'
    // 请求前查询是否包含 token 如果有 token 则携带 token
    if (window.sessionStorage.getItem('token')) {
        success.headers['Authorization'] = window.sessionStorage.getItem('token')
        // Message.info(window.sessionStorage.getItem('token'))
    }

    return success
}, error => {

})

export default service