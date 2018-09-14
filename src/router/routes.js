import Todo from '../views/todo/item.vue'
import Tabs from '../views/todo/tabs.vue'
import App from '../App.vue'

export default [{
    path: '/',
    component: App
}, {
    path: '/todo',
    component: Todo
}, {
    path: '/tabs',
    component: Tabs
}]