import request from '@/utils/request'

const baseUrl = `/log/warehouse/inOrder`

export default {
    pageFind(page, limit, inOrderQueryVo) {  // 分页条件查询入库订单信息
        return request({
            url: `${baseUrl}/pageFind/${page}/${limit}`,
            method: 'post',
            data: inOrderQueryVo
        })
    },

    deleteById(id) {  // 删除入库订单信息
        return request({
            url: `${baseUrl}/${id}`,
            method: 'delete'
        })
    },

    exportInOrder(inOrderQueryVo) {  // 导出查询条件下的所有信息的表格
        return request({
            url: `${baseUrl}/exportInOrder`,
            method: 'post',
            data: inOrderQueryVo,
            responseType: "blob"   // responseType 指定返回结果类型为 文件类型
        })
    },

    exportCurrentInOrder(page, limit, inOrderQueryVo) {  // 仅仅导出当前页的入库信息
        return request({
            url: `${baseUrl}/exportCurrentInOrder/${page}/${limit}`,
            method: 'post',
            data: inOrderQueryVo,
            responseType: 'blob'
        })
    }
}