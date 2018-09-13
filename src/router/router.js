import Vue from 'vue/dist/vue'
import routes from './routes'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes,
    mode: 'history',
    //再某些 不支持history路由格式的浏览器 会自动返回哈希的路由
    fallback: true,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }

    }
})