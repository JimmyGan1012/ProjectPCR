// src/plugins/vuetify.js

import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify,{
    iconfont:'mdi'
})

const MY_ICONS={
}

const opts = {}

export default new Vuetify(opts)