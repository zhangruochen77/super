import request from '@/utils/request'

const basePath = `/admin/login`

export default {
    loginByPass(passwordParams) {  // 使用密码方式登录
        return request({
            url: `${basePath}`,
            method: 'post',
            data: passwordParams
        })
    }
}