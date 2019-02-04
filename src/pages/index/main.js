import Vue from 'vue'
import App from './index'

import vnode2Canvas from 'vnode2canvas'
Vue.use(vnode2Canvas)

const app = new Vue(App)
app.$mount()
