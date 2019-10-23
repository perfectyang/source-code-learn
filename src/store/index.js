import Vue from 'vue'
import Vuex from '../realVuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    age: 10
  },
  modules: {
    a: {
      state: {
        age: 20
      },
      mutations: {
        add (state, payload) {
          console.log('里面的state', state)
          state.age += payload
          return state
        },
        plus (state, payload) {
          state.age -= payload
          return state
        }
      },
      actions : {
        syncAdd ({commit, dispatch}, payload) {
          // console.log('里面的')
          commit('add', payload)
        }
      },
      modules: {
        d: {
          state: {
            dddd: 6666
          },
          getters: {
            getState (state) {
              return state
            }
          }
        }
      }
    }
  },
  getters: {
    myAge (state) {
      return state.age + 10
    }
  },
  actions : {
    syncAdd ({commit, dispatch}, payload) {
      // console.log('外面的')
      commit('add', payload)
      // setTimeout(_ => {
      //   dispatch('minus', 100)
      // }, 5000)
    },
    minus ({commit, dispatch}, payload) {
      commit('plus', 10)
    }
  },
  mutations: {
    add (state, payload) {
      console.log('外面的state', state)
      state.age += payload
      return state
    },
    plus (state, payload) {
      state.age -= payload
      return state
    }
  }
})
