import Vue from "vue";

//vue 生命周期 beforeCreate

new Vue({
    el: '#root',
    template: `
        <h2 @click="alertMsg">{{msg}}<h2>
    `,
    data: {
        msg: '美俄大战'
    },
    methods: {
        alertMsg() {
            alert(this.msg)
        }
    }
})