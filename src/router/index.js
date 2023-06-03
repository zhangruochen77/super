import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home"
import Supplier from "@/views/supplier/Supplier";
import Supply from "@/views/supplly/Supply";
import GoodsType from "@/views/goodsType/GoodsType";
import Goods from "@/views/goods/Goods";
import Vip from "@/views/vip/Vip";
import Need from "@/views/need/Need";
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/supplier',
                name: 'supplier',
                component: Supplier  // 供应商
            },
            {
                path: '/supply',
                name: 'supply',
                component: Supply  // 供应品
            },
            {
                path: '/goodsType',
                name: 'goodsType',
                component: GoodsType  // 供应类型
            },
            {
                path: '/goods',
                name: 'goods',
                component: Goods  // 商品
            },
            {
                path: '/vip',
                name: 'vip',
                component: Vip  // vip 管理
            },
            {
                path: '/need',
                name: 'need',
                component: Need  // vip 管理
            }
            // {
            //     path: '/warehouse/goods',
            //     name: 'goods',
            //     component: Goods  // 商品管理
            // },
            // {
            //     path: '/warehouse/inOrder',
            //     name: 'inOrder',
            //     component: InOrder  // 入库订单管理
            // },
            // {
            //     path: '/car/car',
            //     name: 'car',
            //     component: Car
            // },
            // {
            //     path: '/car/carRepair',
            //     name: 'carRepair',
            //     component: CarRepair
            // },
            // {
            //     path: '/cmn/cmn',
            //     name: 'cmn',
            //     component: Cmn
            // },
            // {
            //     path: '/order/order',
            //     name: 'order',
            //     component: Order
            // },
            // {
            //     path: '/order/orderHistory',
            //     name: 'orderHistory',
            //     component: OrderHistory
            // },
            // {
            //     path: '/dispatcher/carManage',
            //     name: 'carManage',
            //     component: CarManage
            // },
            // {
            //     path: '/dispatcher/orderPlat',
            //     name: 'orderPlat',
            //     component: OrderPlat
            // },
            // {
            //     path: '/dispatcher/personOrder',
            //     name: 'personOrder',
            //     component: PersonOrder
            // },
            // {
            //     path: '/dispatcher/historyOrder',
            //     name: 'historyOrder',
            //     component: HistoryOrder
            // }
        ]
    },
    {
        path: '/',
        name: 'login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//     // 做登录操作 直接放行
//     if (to.path === '/') {
//         next()
//         return
//     }
//
//     // 获取用户是否登录的 token
//     let token = window.sessionStorage.getItem('token')
//
//     // 没有登录 去做登录
//     if (token === null || token === '') {
//         next({
//             path: '/',
//             query: {redirect: to.fullPath}
//         })
//         return
//     } else{
//         next()
//         return
//     }
// })

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router
