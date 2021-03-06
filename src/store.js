import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    user: null,
    business: null
  },
  getters:{
    user:(state)=>{
        return state.user
    },

    business:(state)=>{
      return state.business
    }
},
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    user(state, user){
        state.user = user 
    },
    business(state, business){
      state.business = business 
  }
  },
  actions: {
    user(context, user){
        context.commit('user', user)
    },
    business(context, business){
      context.commit('business', business)
  }

  },
})
