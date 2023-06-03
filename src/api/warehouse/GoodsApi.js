import request from '@/utils/request'

const baseUrl = `/log/warehouse/goods`

export default {
    pageFind(page, limit, goodsQueryVo) {  // 分页查询商品信息
        return request({
            url: `${baseUrl}/pageFind/${page}/${limit}`,
            method: 'post',
            data: goodsQueryVo
        })
    },

    add(goodsVo) {  // 添加新商品
        return request({
            url: `${baseUrl}/add`,
            method: 'post',
            data: goodsVo
        })
    },

    deleteGoods(id) {  // 移除商品
        return request({
            url: `${baseUrl}/delete/${id}`,
            method: 'delete'
        })
    },

    updateState(id, state) {  // 更新商品状态
        return request({
            url: `${baseUrl}/updateState/${id}/${state}`,
            method: 'put'
        })
    },

    get(id) {  // 获取商品详细信息
        return request({
            url: `${baseUrl}/get/${id}`,
            method: 'get'
        })
    },

    listGoods() {   // 获取所有商品的名称 和 id
        return request({
            url: `${baseUrl}/listGoods`,
            method: 'get'
        })
    },

    inOrder(id, number) {  // 商品入库操作接口
        return request({
            url: `${baseUrl}/inGoods/${id}/${number}`,
            method: 'put'
        })
    }
}
