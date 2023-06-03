import request from '@/utils/request'

const basePath = `/log/admin/admin/login`

export default {
    loginByPhone(phoneParams) {  // 使用手机验证码登录
        return request({
            url: `${basePath}/phone`,
            method: 'post',
            data: phoneParams
        })
    },

    loginByPass(passwordParams) {  // 使用密码方式登录
        return request({
            url: `${basePath}/password`,
            method: 'post',
            data: passwordParams
        })
    }
}