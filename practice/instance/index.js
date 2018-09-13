import Vue from 'vue'

let app = new Vue({
        el: '#root',
        template: '<div ref="msg">{{msg}}</div>',
        data: {
            msg: 'hgc'
        }
    })
    //vue 实例的基本属性和方法

console.log(app.$el)
console.log(app.$refs.msg === app.$el)
    //watch 方法会返回一个销毁watch 方法的函数
const unWatch = app.$watch('msg', (newMsg, oldMsg) => {
    console.log(`${newMsg}:${oldMsg}`)
})

app.$data.msg = 'heguocheng'
app.$data.msg = 'luffy'