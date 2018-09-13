import Vue from 'vue';


new Vue({
        el: '#root',
        template: `
        <div>
            <p>name : {{fullName}}</p>
            <p>newName：{{getName()}}</p>
            <p>num:{{num}}</p>
            <p><input type="text" v-model="firstName"></p>
            <p><input type="text" v-model="secondName"></p>
            <p><input type="text" v-model="num"></p>
        </div>
    `,
        data: {
            firstName: 'he',
            secondName: 'guocheng',
            num: 0,
            obj: {
                a: 0
            }
        },
        computed: {
            fullName() {
                console.log(`computed running`)
                return this.firstName + ' ' + this.secondName;
            }
        },
        methods: {
            getName() {
                console.log(`getName running`)
                return this.firstName + ' ' + this.secondName;
            }
        },
        mounted() {
            this.obj = {
                a: 2
            }

            this.obj.a = 4;
        },
        watch: {
            firstName: {
                handler() {
                    console.log('watch 监听 firstname 被执行')
                },
                //默认监听事件开始不被加载
                //该属性设置为 true 默认就加载该属性
                immediate: true
            },
            obj: {
                handler() {
                    console.log('watch 监听 obj 被执行')
                }
            },
            'obj.a': {
                handler() {
                    console.log('watch 监听obj.a 被执行')
                }
            }
        }
    })
    /**
     * watch 不能触发对象内部属性的变化
     * 只能监控 被检测对象的整体赋值变化
     * 
     */
    /**
     * watch  和 computed 和 methods里面的方法 的区别
     * computed 只是在所涉及到的变量有变化的时候才会 执行该方法（性能稍好）
     * methods里面的方法 所有变量执行的时候里面的方法都会执行
     * watch
     */