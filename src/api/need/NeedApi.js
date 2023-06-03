import request from '@/utils/request'

const base = `/need`

export default {
    add(supplier) {
        return request({
            url: `${base}/add`,
            method: 'post',
            data: supplier
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
    }
}