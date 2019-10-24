import Vue from 'vue'
import db from './db'
console.log('db', db)
Vue.use(db)

// [{
//   state: {},
//   getters: {},
//   actions: {},
//   children: {
//     son: {
//       state: {}
//     }
//   }
// }]

export default new db.DB({
  state: {
    a: 1,
  },
  module: {
    son: {
      state: {
        y: 11
      },
      mutations: {
        add (state, payload) {
          console.log('里面')
          state.y += payload
        }
      },
      getters: {
        aState(state) {
          return state.y
        }
      }
    }
  },
  actions: {
    syncAdd ({commit, dispatch}, payload) {
      commit('add', payload)
    }
  },
  getters: {
    outState(state) {
      return state.a
    }
  },
  mutations: {
    add (state, payload) {
      console.log('外面')
      state.a += payload
    }
  }

})