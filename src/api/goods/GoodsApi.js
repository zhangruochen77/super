import request from '@/utils/request'

const base = `/goods`

export default {
    add(goods) {
        return request({
            url: `${base}/add`,
            method: 'post',
            data: goods
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
    update(goods) {
        return request({
            url: `${base}`,
            method: 'put',
            data: goods
        })
    },
    overCount() {
        return request({
            url: `${base}/overCount`,
            method: 'get'
        })
    },
    sold(id) {
        return request({
            url: `${base}/${id}`,
            method: 'put'
        })
    },
    soldByVip(id, vipPhone) {
        return request({
            url: `${base}/${id}/${vipPhone}`,
            method: 'put'
        })
    },
    pageOver(current, size) {
        return request({
            url: `${base}/over/${current}/${size}`,
            method: 'get',
        })
    },
    deleteAllOver() {
        return request({
            url: `${base}/all`,
            method: 'delete'
        })
    },

}