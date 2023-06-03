import request from '@/utils/request'

const base = `/goodsType`

export default {
    add(goodsType) {
        return request({
            url: `${base}/add`,
            method: 'post',
            data: goodsType
        })
    },
    page(current, size) {
        return request({
            url: `${base}/${current}/${size}`,
            method: 'get',
        })
    },
    deleteData(id) {
        return request({
            url: `${base}/${id}`,
            method: 'delete'
        })
    },
    getAll() {
        return request({
            url: `${base}`,
            method: 'get'
        })
    },
    get(id) {
        return request({
            url: `${base}/${id}`,
            method: 'get'
        })
    },
    update(goodsType) {
        return request({
            url: `${base}`,
            method: 'put',
            data: goodsType
        })
    }
}