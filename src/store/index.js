import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    pageTitle: "",
    isLoading: false,
    isShow:true,
    tree:[],
    host:'http://192.168.0.20:8088/vito'
  },
  mutations:{
    increment (state, title) {
      // 变更状态
      state.pageTitle = title
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    showtab (state, s) {
      state.isShow =s
    },
    showtab (state, s) {
      state.isShow =s
    }
  },
  computed: {
  },
  modules: {
    user: user
  },
  strict: process.env.NODE_ENV !== 'production'
})
