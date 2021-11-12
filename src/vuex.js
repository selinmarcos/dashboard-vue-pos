import Vue from 'vue'
import Vuex from 'vuex'
//import {Commit, createStore} from 'vuex'

Vue.use(Vuex)

const state ={
    user:null
}

const storee = new Vuex.Store({
    state,
    getters:{
        user:(state)=>{
            return state.user
        }
    },
    actions:{
        user(context, user){
            context.commit('user', user)
        }
    },
    mutations:{
        user(state, user){
            state.user = user 
        }
    }
})

export default storee